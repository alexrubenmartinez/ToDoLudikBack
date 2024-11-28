let express = require('express');
let router = express.Router();
let tareaController = require('../controller/tareaController');
let authenticate = require('../middleware/authenticate');


router.post('/crearTarea', authenticate.authenticate, tareaController.crearTarea);

module.exports = router;