let Tarea = require('../model/tarea')

let crearTarea = async function (req, res) {
    try {
      let data = req.body;
  
      // Validar que el título esté presente
      if (!data.titulo) {
        return res.status(400).send({ message: 'El título es requerido' });
      }
  
      let tarea = await Tarea.create(data);
      res.status(200).send({ message: 'Tarea creada', data: tarea });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al crear tarea', error: error.message });
    }
  };
  
  module.exports = {
    crearTarea,
  };