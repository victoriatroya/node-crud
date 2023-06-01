const response = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const {generarJwt} = require("../helpers/generar-jwt");
const {googleVerify} = require("../helpers/google-verify");
const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctas - correo'
            })
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctas - estado: false'
            })
        }

        const validPassord = bcryptjs.compareSync(password, usuario.password)

        if (!validPassord) {
            return res.status(400).json({
                msg: 'Usuario/Password no son correctas - password:'
            })
        }

        const token = await generarJwt( usuario.id );

        res.json({
            msg: 'ok',
            token,
        })

    }catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }


}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                img,
                password: ':p',
                google: true,
                role: 'USER_ROLE'
            };

            usuario = new Usuario(data)
            await usuario.save()
        }

        //Si el usuario en BD no esta autenticado con google
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'El usuario bloqueado, hable con el administrador'
            })
        }

        const token = await generarJwt( usuario.id );

        res.json({
            token,
            usuario
        })
    } catch (e) {
        console.log(e)
        // res.status(400).json({
        //     msg: 'Ha ocurrido un error'
        // })
    }

}

module.exports = {
    login,
    googleSignIn
}