//conf y rutas
let express = require('express')
let app = express()
let port = process.env.PORT || 3001
let tareaRoute = require('./routes/tareaRoute')
let usuarioRoute = require('./routes/usuarioRoute')
let mongoose = require('mongoose')
const cors = require('cors');


// Allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // or '*' to allow all origins
  }));

// Middleware para parsear cuerpos JSON
app.use(express.json()) // Necesario para que req.body funcione

//conexion a mongodb
mongoose
  .connect('mongodb://localhost:27017/todoback', {
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

//inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})

module.exports = app
