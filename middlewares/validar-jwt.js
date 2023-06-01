const jwt = require('jsonwebtoken');
const {response} = require("express");
const Usuario = require('../models/usuario');

const validarJWT = async ( req, res = response, next ) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = req.usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en la base de datos'
            })
        }

        if (!usuario.estado) {
            res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }
        req.uid = usuario
        next();
    } catch (e) {
        res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
}

module.exports = {
    validarJWT
}