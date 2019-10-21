const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require('../models/Postagem')
const Postagem = mongoose.model("postagens")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Ticket")
const Ticket = mongoose.model("tickets")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Contato")
const Contato = mongoose.model("contatos")
require("../models/Operacao")
const Operacao = mongoose.model("operacoes")
require("../models/Pendencia")
const Pendencia = mongoose.model("pendencias")
const {eAdmin} = require("../helpers/eAdmin")

/* ROTA PRINCIPAL DO ADM (TELA DE OPERAÇÕES)*/
router.get('/novaLista', eAdmin, (req, res) => {
    res.render("admin/index");     
});

router.post('/novaLista', eAdmin, (req, res) => {
    const novaLista = new Categoria({
        nome: req.body.nomeLista,
        descricao: req.body.descricaoLista,
        imagem: req.body.imagemLista,
        link: req.body.linkLista
    })

    novaLista.save().then(() => {
        req.flash("success_msg", "Sua lista foi registrada com sucesso!")
        res.redirect("/admin/novaLista")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao registrar a lista, tente novamente!")
        console.log("Erro: " + err)
        res.redirect("/admin/novaLista")
    })
});

router.get('/novoContato', eAdmin, (req, res) => {
    Categoria.find().then((categoria) => {
        res.render("admin/novoContato", {categoria: categoria});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar as categorias")
        res.redirect("/admin/novoContato")
    })
});

router.post('/novoContato', eAdmin, (req, res) => {
    const novoContato = new Contato({
        cidade: req.body.cidade,
        empresa: req.body.empresa,
        site: req.body.site,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        observacoes: req.body.observacoes,
        categoria: req.body.categoria
    })

    novoContato.save().then(() => {
        req.flash("success_msg", "Seu contato foi registrado com sucesso!")
        res.redirect("/admin/novoContato")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao registrar o contato, tente novamente!")
        console.log("Erro: " + err)
        res.redirect("admin/novoContato")
    })
});

router.get('/editarCategorias', eAdmin, (req, res) => {
    Categoria.find().then((categoria) => {
        res.render("admin/editarCategorias", {categoria: categoria});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar as categorias")
        res.redirect("/admin/editarCategorias")
    })
});

router.post('/ativarCategoria', eAdmin, (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        
        if(categoria.ativo == true){
            categoria.ativo = false
        }else{
            categoria.ativo = true
        }

        categoria.save().then(() => {
            req.flash("success_msg", "Ação realizada com sucesso!")
            res.redirect('/admin/editarCategorias');            
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/editarCategorias")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao realizar a ação!")
        res.redirect("/admin/editarCategorias")
    })
});

router.get('/editarUsuarios', eAdmin, (req, res) => {
    Usuario.find().then((usuario) => {
        Categoria.find().then((categoria) => {
            res.render("admin/editarUsuarios", {usuario: usuario, categoria: categoria});
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar os usuarios")
        res.redirect("/admin/editarUsuarios")
    })
});

router.post('/atribuirLista', eAdmin, (req, res) => {
    Usuario.findOne({_id: req.body.idUsuario}).then((usuario) => {
        
        usuario.categorias.push(req.body.listasDisponiveis)

        usuario.save().then(() => {
            req.flash("success_msg", "Alterações salvas com sucesso!")
            res.redirect('/admin/editarUsuarios');            
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/editarUsuarios")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar as alterações")
        res.redirect("/admin/editarUsuarios")
    })
});

router.post('/editarLista', eAdmin, (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nomeLista,
        categoria.link = req.body.linkCompra,
        categoria.imagem = req.body.imagemLista,
        categoria.descricao = req.body.descricao

        categoria.save().then(() => {
            req.flash("success_msg", "Alterações salvas com sucesso!")
            res.redirect('/admin/editarCategorias');            
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/editarCategorias")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar as alterações")
        res.redirect("/admin/editarCategorias")
    })
});

router.get("/operacoes", eAdmin, (req, res) => {
    Operacao.find({pendencia: true}).populate("lista").populate("usuario").then((operacao) => {
        res.render("admin/operacoes", {operacao: operacao});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar as operações!")
        res.redirect("/admin/operacoes")
    })
});

router.post("/aprovarPagamento", eAdmin, (req, res) => {
    Operacao.findOne({_id: req.body.idOperacao}).then((operacao) => {
        operacao.pendencia = false,
        operacao.pagou = true

        operacao.save().then(() => {
            Usuario.findOne({_id: operacao.usuario}).then((usuario) => {
        
                usuario.categorias.push(operacao.lista)
        
                usuario.save().then(() => {
                    req.flash("success_msg", "A lista foi atribuida ao usuário!")
                    res.redirect('/admin/operacoes');            
                }).catch((err) => {
                    req.flash("error_msg", "Erro interno")
                    res.redirect("/admin/operacoes")
                })
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao salvar as alterações")
                res.redirect("/admin/operacoes")
            })          
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect("/admin/operacoes")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar as alterações")
        res.redirect("/admin/operacoes")
    })
});

router.post("/alertarUsuario", eAdmin, (req, res) => {
    Operacao.findOne({_id: req.body.idOperacao}).populate("usuario").populate("lista").then((operacao) => {
        const novaPendencia = new Pendencia({
            mensagem: [req.body.titulo, req.body.mensagem, req.body.cor, operacao.lista.link],
            usuario: operacao.usuario._id,
            lista: operacao.lista._id,
            operacao: operacao._id
        })
    
        novaPendencia.save().then(() => {
            Usuario.findOne({_id: operacao.usuario._id}).then((usuario) => {
                usuario.pendencia = novaPendencia._id
        
                usuario.save().then(() => {
                    req.flash("success_msg", "Alerta enviado com sucesso!")
                    res.redirect('/admin/operacoes');            
                }).catch((err) => {
                    req.flash("error_msg", "Erro interno")
                    res.redirect("/admin/operacoes")
                })
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao atribuir pendencia ao usuário!")
                res.redirect("/admin/operacoes")
            })

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao registrar a pendencia!")
            console.log("Erro: " + err)
            res.redirect("admin/operacoes")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar as operações!")
        res.redirect("/admin/operacoes")
    })
});

/* ROTA QUE LEVA O ADMIN PARA A TELA DE TICKETS PENDENTES */
router.get('/tickets', eAdmin, (req, res) => {
    Ticket.find({pendencia: true}).sort({data: "desc"}).then((ticket) => {
        res.render("admin/tickets", {ticket: ticket});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os tickets, envie-nos um ticket!")
        res.redirect("usuarios/ajuda")
    }) 
});

/* ROTA QUE RESPONDE UM TICKET*/
router.post("/responderTicket", eAdmin, (req, res) => {
    Ticket.findOne({_id: req.body.idTicket}).then((ticket) => {
        ticket.pendencia = false,
        ticket.resposta = req.body.resposta
        ticket.save().then(() => {
            req.flash("success_msg", "Ticket respondido com sucesso!")
            res.redirect("/admin/tickets")
        }).catch((err) => {
            req.flash("error_msg", "Erro ao responder ticket :(")
            res.redirect("/admin/tickets")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao responder ticket :/")
        res.redirect("/admin/tickets")
    })
});

/* ROTA QUE EXCLUI UM TICKET*/
router.post("/excluirTicket", eAdmin, (req, res) => {
    Ticket.remove({_id: req.body.idTicket}).then(() => {
        req.flash("success_msg", "Ticket excluído com sucesso!")
        res.redirect("/admin/tickets")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluír o ticket.")
        res.redirect("/admin/tickets")
    })
});

router.get('/teste', eAdmin, (req, res) => {
    res.render("admin/teste");     
});

module.exports = router;