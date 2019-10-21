const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: ""
    },
    ativo: {
        type: Boolean,
        required: true,
        default: false
    }
});
mongoose.model("categorias", Categoria);