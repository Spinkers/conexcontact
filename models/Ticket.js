const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Ticket = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    assunto: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    resposta: {
        type: String,
        default: ""
    },
    pendencia: {
        type: Boolean,
        default: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("tickets", Ticket);