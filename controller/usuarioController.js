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

let loginUsuario = async function (req, res) {
  try {
    let { email, password } = req.body

    // Verificar si el correo existe
    let usuario = await Usuario.findOne({ email: email })
    console.log(usuario)

    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' })
    }

    // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos
    const passwordMatch = await Bcrypt.compare(password, usuario.password)

    if (!passwordMatch) {
      return res.status(400).send({ message: 'Contraseña incorrecta' })
    }

    // Si las credenciales son correctas, generar el token JWT
    const token = jwt.createToken(usuario)

    // Retornar respuesta con el token
    res.status(200).send({
      message: 'Usuario autenticado',
      data: usuario,
      token: token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'Error al iniciar sesión',
      error: error.message,
    })
  }
}

module.exports = {
  crearUsuario,
  loginUsuario,
}
