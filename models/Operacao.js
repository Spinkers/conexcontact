const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Operacao = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    pagou: {
        type: Boolean,
        default: false,
        required: true
    },
    lista: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    pendencia: {
        type: Boolean,
        default: true,
        required: true
    },
    data: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

mongoose.model("operacoes", Operacao);