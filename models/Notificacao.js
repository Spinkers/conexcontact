const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Notificacao = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    },
    rodape: {
        type: String,
        required: true
    },
    visualizou: {
        type: Boolean,
        default: false
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("notificacoes", Notificacao);