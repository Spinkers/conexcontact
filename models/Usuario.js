const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    categorias: [{
        type: Schema.Types.ObjectId,
        ref: "categorias"
    }],
    notificacoes: [{
        type: Schema.Types.ObjectId,
        ref: "notificacoes"
    }],
    pendencia: {
        type: Schema.Types.ObjectId,
        ref: "pendencias"
    },
    eAdmin: {
        type: Number,
        default: 0
    },
    data: {
        type: Date,
        default: Date.now()
    },
    senha: {
        type: String,
        required: true
    }
})

mongoose.model("usuarios", Usuario)

