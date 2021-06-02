import React from 'react'

const Bienvenida = (props) => {
    return (
        <div className="container">
            <div className="nombre">
                <h1>Ingresa tu nombre:</h1>
                <input type="text" name="nombre" value={props.nombre} 
                onChange={(e) => props.setNombre(e.target.value)} />
                <button onClick={() => props.history.push('/chat')}>Enviar!</button>
            </div>
        </div>
    )
}

export default Bienvenida
