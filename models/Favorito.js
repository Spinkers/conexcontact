const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Favorito = new Schema({
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
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    }
})

mongoose.model("favoritos", Favorito)

