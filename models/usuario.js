const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria'],
        unique: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: false,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function () {
    //Quitar password y __v
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario', UsuarioSchema)