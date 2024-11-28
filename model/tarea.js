let mongoose = require('mongoose')

let Schema = mongoose.Schema

let tareaSchema = Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  estado: {
    type: String,
    enum: ['Pendiente', 'En proceso', 'Completada'], 
    default: 'Pendiente',
    required: true,
  },
  fechaCreacion: { type: Date, default: Date.now, required: true },
  fechaModificacion: { type: Date, default: Date.now, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

})

module.exports = mongoose.model('tarea', tareaSchema)
