let mongoose = require('mongoose')

let Schema = mongoose.Schema

let usuarioSchema = Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = mongoose.model('usuario', usuarioSchema)