const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Pendencia = new Schema({
    mensagem: {
        type: Array,
        default: ["", "", "", ""],
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    operacao: {
        type: Schema.Types.ObjectId,
        ref: "operacoes"
    },
    lista: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    ativo: {
        type: Boolean,
        default: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("pendencias", Pendencia)

