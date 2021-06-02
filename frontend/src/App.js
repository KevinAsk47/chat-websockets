import React, { useEffect, useState } from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './App.css'
import Bienvenida from './Bienvenida'
import Chat from './Chat'
import io from 'socket.io-client'

const App = () => {
  const [nombre, setNombre] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io('http://localhost:4000'))
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Bienvenida nombre={nombre} setNombre={setNombre} {...props} />} />
        {nombre !== '' && <Route path="/chat" render={() => <Chat nombre={nombre} socket={socket} />} />}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
