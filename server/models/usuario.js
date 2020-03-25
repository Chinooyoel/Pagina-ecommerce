const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;



const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    },
    /*provincia: {
        type: String,
        required: true
    },
    codigoFiscal: {
        type: String,
        required: true
    },
    tipoDoc: {
        type: String,
        required: true
    },
    doc: {
        type: Number,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: Number,
        required: true
    },
    direccionl: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    }*/
    role: {
        type: String,
        default: "USER_ROLE",
        enum: ["USER_ROLE", "ADMIN_ROLE"]
    }
})


usuarioSchema.plugin(uniqueValidator, { message: 'Error, el {PATH} debe ser unico.' });

module.exports = mongoose.model("Usuario", usuarioSchema)