const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    codigo: {
        type:String,
        required: true
    },
    marca : {
        type: String,
        required: true
    },
    img : {
        type: String,
        required: false
    },
    garantia : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Producto", productoSchema)