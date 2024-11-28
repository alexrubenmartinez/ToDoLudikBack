let jwt = require('jsonwebtoken')
let moment = require('moment')

const SECRET_KEY = 'secret'

exports.createToken = function (user) {
  let payload = {
    userId: user._id,
    nombre: user.nombre,
    email: user.email,
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })
}
exports.verifyToken = function (token) {
  try {
    let decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch (err) {
    return null
  }
}
