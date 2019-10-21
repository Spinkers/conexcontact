const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Ticket")
const Ticket = mongoose.model("tickets")
require("../models/Contato")
const Contato = mongoose.model("contatos")
require("../models/Favorito")
const Favorito = mongoose.model("favoritos")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Operacao")
const Operacao = mongoose.model("operacoes")
require("../models/Pendencia")
const Pendencia = mongoose.model("pendencias")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const {eUser} = require("../helpers/eUser")

/* ************************ */

router.get("/painel", eUser, (req, res) => {
    Usuario.findOne({_id: req.user.id}).populate("categorias")
                                       .populate("pendencia")
                                       .then((usuario) => {
        res.render("usuarios/index", {usuario: usuario});
    })
});

router.post("/lista", eUser, (req, res) => {
    Contato.find({categoria: req.body.id}).then((contato) => {
        res.render("usuarios/lista", {contato: contato});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar lista")
        res.redirect("/usuarios/painel")
    })
})

router.post("/favoritar", eUser, (req, res) => {
    Contato.findOne({_id: req.body.id}).then((contato) => {
        const novoFavorito = new Favorito({
            cidade: contato.cidade,
            empresa: contato.empresa,
            site: contato.site,
            endereco: contato.endereco,
            telefone: contato.telefone,
            whatsapp: contato.whatsapp,
            email: contato.email,
            observacoes: contato.observacoes,
            usuario: req.user.id
        })
        novoFavorito.save().then(() => {
            req.flash("success_msg", "Seu contato foi favoritado com sucesso!")
            res.redirect("/usuarios/favoritos")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao favoritar o contato, tente novamente!")
            console.log("Erro: " + err)
            res.redirect("/usuarios/painel")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao checar contato")
        res.redirect("/usuarios/painel")
    })
})

router.get("/favoritos", eUser, (req, res) => {
    Favorito.find({usuario: req.user.id}).then((favorito) => {
        res.render("usuarios/favoritos", {favorito: favorito});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar favoritos")
        res.redirect("/usuarios/painel")
    })
})

router.post("/alterarFavorito", eUser, (req, res) => {
    Favorito.findOne({_id: req.body.id}).then((favorito) => {
        favorito.cidade = req.body.cidade,
        favorito.empresa = req.body.empresa,
        favorito.site = req.body.site,
        favorito.endereco = req.body.endereco,
        favorito.telefone = req.body.telefone,
        favorito.whatsapp = req.body.whatsapp,
        favorito.email = req.body.email,
        favorito.observacoes = req.body.observacoes,
        favorito.usuario = req.user.id

        favorito.save().then(() => {
            req.flash("success_msg", "Alterações salvas com sucesso!")
            res.redirect('/usuarios/favoritos');            
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect("/usuarios/favoritos")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar as alterações")
        res.redirect("/usuarios/favoritos")
    })
})

/* ROTA QUE EXCLUI UM FAVORITO*/
router.post("/removerFavorito", eUser, (req, res) => {
    Favorito.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Favorito excluído da sua lista com sucesso!")
        res.redirect("/usuarios/favoritos")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluír o favorito.")
        res.redirect("/usuarios/favoritos")
    })
})

router.get("/catalogo", eUser, (req, res) => {
    Categoria.find({ativo: true}).then((categoria) => {
        res.render("usuarios/catalogo", {categoria: categoria});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar as categorias")
        res.redirect("/usuarios/catalogo")
    })
})

/* ************************ */

/* ROTA QUE FAZ DE FATO O REGISTRO */
router.post("/register", (req, res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
        erros.push({texto: "Sobrenome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválido"})
    }
    if(req.body.senha.length < 6){
        erros.push({texto: "Senha muito curta"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "Senhas não conferem, tente novamente!"})
    }

    if(erros.length > 0){
        res.render("register", {erros: erros})
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash("error_msg", "Email já registrado")
                res.redirect("/register")
            }else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash("erro_msg", "Houve um erro durante o salvamento do usuário")
                            res.redirect("/register")
                        }

                        novoUsuario.senha = hash
                        novoUsuario.save().then(() => {
                            req.flash("success_msg", "Usuário criado com sucesso!")
                            res.redirect("/login")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamente!")
                            res.redirect("/register")
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/register")
        })
    }
})

/* ROTA QUE FAZ DE FATO O LOGIN */
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/usuarios/painel",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

/* ROTA DE TESTE PARA INSERIR DADOS */
router.post("/adquirirLista", eUser, (req, res) => {
    const novaOperacao = new Operacao({
        usuario: req.body.idUsuario,
        lista: req.body.idLista
    })

    novaOperacao.save().then(() => {
        Categoria.findOne({_id: req.body.idLista}).then((categoria) => {
            res.redirect(categoria.link)            
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao registrar a compra, envie-nos um ticket!")
            res.redirect("/usuarios/ajuda")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao registrar a compra, envie-nos um ticket!")
        console.log("Erro: " + err)
        res.redirect("/usuarios/ajuda")
    })
})

router.post("/continuarPagamento", eUser, (req, res) => {
    Pendencia.remove({_id: req.body.idPendencia}).then(() => {
        Usuario.findOne({_id: req.user.id}, function(err, usuario){
            usuario.pendencia = undefined;
            usuario.save();
            res.redirect(req.body.linkPendencia);
          }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao excluir a pendencia!")
            console.log("Erro: " + err)
            res.redirect("/usuarios/painel")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluír a pendencia.")
        res.redirect("/usuarios/ajuda")
    })
})

router.post("/desistirPagamento", eUser, (req, res) => {
    Pendencia.findOne({_id: req.body.idPendencia}).then((pendencia) => {
        var idOp = pendencia.operacao
        var idPe = pendencia.operacao
        Pendencia.remove({_id: req.body.idPendencia}).then(() => {
            Usuario.findOne({_id: req.user.id}, function(err, usuario){
                usuario.pendencia = undefined;
                usuario.save();
                Operacao.remove({_id: idOp}).then(() => {
                    req.flash("success_msg", "Você desistiu da compra com sucesso!")
                    res.redirect("/usuarios/painel")
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao excluír a operação.")
                    res.redirect("/usuarios/ajuda")
                })
              }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao desassociar a pendencia do usuário!")
                console.log("Erro: " + err)
                res.redirect("/usuarios/painel")
            })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao remover a pendencia!")
            res.redirect("/usuarios/ajuda")
        })


    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao localizar a pendencia!")
        res.redirect("/usuarios/ajuda")
    })
})

router.get("/ajuda", eUser, (req, res) => {
    Ticket.find({usuario: req.user.id}).sort({data: "desc"}).then((ticket) => {
        res.render("usuarios/ajuda", {ticket: ticket});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os seus tickets!")
        res.redirect("usuarios/ajuda")
    })
})

/* ROTA QUE ABRE UM NOVO TICKET */
router.post("/abrirTicket", eUser, (req, res) => {
    const novoTicket = new Ticket({
        usuario: req.user.id,
        nome: req.body.nome,
        assunto: req.body.assunto,
        descricao: req.body.descricao
    })

    novoTicket.save().then(() => {
        req.flash("success_msg", "Seu ticket foi registrado com sucesso, entraremos em contato o mais breve possível!")
        res.redirect("/usuarios/ajuda")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao registrar o ticket, tente novamente!")
        res.redirect("/usuarios/ajuda")
    })
    
})

/* ROTA QUE DESLOGA USUÁRIO */
router.get("/logout", (req, res) => {
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect("/login")
})


module.exports = router