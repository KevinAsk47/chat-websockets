const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes')
const socket = require('socket.io')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

const PORT = process.env.PORT
const HOST = process.env.HOST || '0.0.0.0'

const server = app.listen(PORT, HOST, () => console.log(`App listening on port ${PORT} / ${HOST}`))

const io = socket(server, {cors: {origin: '*'}})

io.on('connection', (socket) => {
    console.log("Entró una nueva conexión")
    socket.on("teMandeNuevoMensaje", (nuevoMensaje) => {
        io.sockets.emit('actualizate', nuevoMensaje)
    })

    socket.on("escribiendo", (nombre) => {
        socket.broadcast.emit('escribiendo', nombre)
    })
})