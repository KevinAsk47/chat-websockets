import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chat = (props) => {
    const [mensaje, setMensaje] = useState('')
    const [reload, setReload] = useState(false)
    const [mensajes, setMensajes] = useState([])
    const [escribiendo, setEscribiendo] = useState(null)

    useEffect(() => {
        fetch('http://localhost:4000/api/chat')
        .then(res => res.json())
        .then(data => setMensajes(data.response) )
    }, [reload])

    useEffect(() => {
        if (props.socket) {
            props.socket.on('actualizate', (nuevoMensaje) => {
              setMensajes([...mensajes, nuevoMensaje])
            })
            props.socket.on('escribiendo', (nombre) => {
             setEscribiendo(nombre)
                setTimeout(() => {
                    setEscribiendo(null)
                },1000)
              })
        }
    })

    const enviarMensaje = async () => {
        const nuevoMensaje = {
            emisor: props.nombre,
            mensaje
        }
        const respuesta = await axios.post('http://localhost:4000/api/chat', nuevoMensaje)
        props.socket.emit('teMandeNuevoMensaje', nuevoMensaje)
        setReload(!reload)
        setMensaje('')
    }
    
    return (
        <div className="container">
            <div className="chat">
                <div className="mensajes">
                    {mensajes.map(mensaje => (
                        <div className="mensaje">
                            <h3>{mensaje.emisor} dijo: {mensaje.mensaje}</h3>
                        </div>
                    ))}
                    {escribiendo && <h3 style={{color: 'red'}}>{escribiendo} está escribiendo...</h3>}
                </div>
                <div className="input">
                <input type="text" name="mensaje" placeholder="Escribí acá..."
                value={mensaje} onChange={(e) => {
                    setMensaje(e.target.value)
                    props.socket.emit('escribiendo', props.nombre)
                } } />
                <button onClick={enviarMensaje}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
