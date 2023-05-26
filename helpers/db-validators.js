const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role })
    if (!existeRol) {
        throw new Error(`El rol ${ role } no esta registrado n la BD`)
    }
}

const emailExits = async (correo = '') => {
    const emailExists = await Usuario.findOne({ correo })

    if (emailExists) {
        throw new Error('El correo ya esta registrado')
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id )

    if (!existeUsuario) {
        throw new Error('El id no existe')
    }
}

module.exports = {
    esRoleValido,
    emailExits,
    existeUsuarioPorId
}