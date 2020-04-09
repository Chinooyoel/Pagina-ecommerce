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
    provincia: {
        type: String,
        required: false
    },
    documento: {
        type: Number,
        required: true,
        unique: true
    },
    localidad: {
        type: String,
        required: false
    },
    codigoPostal: {
        type: Number,
        required: false
    },
    direccion: {
        type: String,
        required: false
    },
    celular: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: ["USER_ROLE", "ADMIN_ROLE"]
    }
})


usuarioSchema.plugin(uniqueValidator, { message: 'Error, el {PATH} debe ser unico.' });

module.exports = mongoose.model("Usuario", usuarioSchema)