const Tarea = require('../model/tarea')

const crearTarea = async (req, res) => {
  try {
    const data = req.body

    if (!data.titulo) {
      return res.status(400).json({ message: 'El título es requerido' })
    }

    data.userId = req.user.userId

    const tarea = await Tarea.create(data)
    res.status(201).json({ message: 'Tarea creada', data: tarea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear tarea', error: error.message })
  }
}

const obtenerTareas = async (req, res) => {
  console.log('req.user:', req.user)

  try {
    const tareas = await Tarea.find({ userId: req.user.userId })
    res.status(200).json({ message: 'Tareas obtenidas', data: tareas })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message })
  }
}

const obtenerTareaPorId = async (req, res) => {
  try {
    const { id } = req.params
    const tarea = await Tarea.findOne({ _id: id, userId: req.user.userId }) 

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' })
    }

    res.status(200).json({ message: 'Tarea obtenida', data: tarea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener tarea', error: error.message })
  }
}


const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    data.fechaModificacion = new Date()

 
    const tarea = await Tarea.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      data,
      { new: true, runValidators: true }
    )

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' })
    }

    res.status(200).json({ message: 'Tarea actualizada', data: tarea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al actualizar tarea', error: error.message })
  }
}


const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params

    const tarea = await Tarea.findOneAndDelete({ _id: id, userId: req.user.userId })

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada o no autorizada' })
    }

    res.status(200).json({ message: 'Tarea eliminada', data: tarea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar tarea', error: error.message })
  }
}

module.exports = {
  crearTarea,
  obtenerTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
}
