import express from 'express'
import routes from './routes.js'

const server = express()
server.use(express.json())
server.use(routes)

server.listen(6767, () => {
    console.log("Servidor funcionando.")
})

