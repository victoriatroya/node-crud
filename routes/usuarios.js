const { Router } = require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const {check} = require("express-validator");
const {esRoleValido, emailExits, existeUsuarioPorId} = require("../helpers/db-validators");
const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRole
} = require('../middlewares')


const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'NO ES UN ID VALIDO').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validarCampos,
    ],
    usuariosPut );

router.post(
    '/',
    [
        check('correo', 'El correo no es valido').custom( emailExits ),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de mas de seis caracteres').isLength({ min: 6 }),
        check('role').custom( esRoleValido ),
        validarCampos
    ],
    usuariosPost );

router.delete('/:id',  [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'NO ES UN ID VALIDO').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],
    usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;