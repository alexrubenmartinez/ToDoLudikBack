require('dotenv').config()
let express = require('express')
let app = express()
let port = process.env.PORT
let cors_origin = process.env.CORS_ORIGIN
let bd_uri = process.env.DB_URI
let tareaRoute = require('./routes/tareaRoute')
let usuarioRoute = require('./routes/usuarioRoute')
let mongoose = require('mongoose')
const cors = require('cors')

app.use(
  cors({
    origin: cors_origin,
  })
)

app.use(express.json())

mongoose 
  .connect(bd_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión a MongoDB establecida')
  })
  .catch((err) => {
    console.log(err)
  })

app.use('/tarea', tareaRoute)
app.use('/usuario', usuarioRoute)

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})

module.exports = app
