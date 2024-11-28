let Usuario = require('../model/usuario')
let Bcrypt = require('bcrypt')
let jwt = require('../helper/jwt')

let crearUsuario = async function (req, res) {
  try {
    let data = req.body

    if (data.password) {
      // Usamos bcrypt.hash() con promesas para evitar el uso de callbacks
      const hashedPassword = await Bcrypt.hash(data.password, 10)
      data.password = hashedPassword

      // Crear el usuario con la contraseña encriptada
      let usuario = await Usuario.create(data)

      // Retornar respuesta con el token JWT
      res.status(200).send({
        message: 'Usuario creado',
        data: usuario,
        token: jwt.createToken(usuario),
      })
    } else {
      res.status(400).send({ message: 'La contraseña es obligatoria' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'Error al crear usuario',
      error: error.message,
    })
  }
}

module.exports = {
  crearUsuario,
}
