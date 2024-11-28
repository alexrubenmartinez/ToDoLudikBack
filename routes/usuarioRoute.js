let express = require('express');
let router = express.Router();
let usuarioController = require('../controller/usuarioController');
let authenticate = require('../middleware/authenticate');


router.post('/crearUsuario', usuarioController.crearUsuario);

module.exports = router;