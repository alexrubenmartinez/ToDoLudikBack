const express = require('express')
const router = express.Router()
const tareaController = require('../controller/tareaController')
const authenticate = require('../middleware/authenticate')


router.post('/crearTarea', authenticate.authenticate, tareaController.crearTarea)
router.get('/obtenerTareas', authenticate.authenticate, tareaController.obtenerTareas)
router.get('/obtenerTarea/:id', authenticate.authenticate, tareaController.obtenerTareaPorId)
router.put('/actualizarTarea/:id', authenticate.authenticate, tareaController.actualizarTarea)
router.delete('/eliminarTarea/:id', authenticate.authenticate, tareaController.eliminarTarea)

module.exports = router
