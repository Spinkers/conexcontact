const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Contato = new Schema({
    cidade: {
        type: String,
        required: true
    },
    empresa: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    observacoes: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    }
})

mongoose.model("contatos", Contato)

