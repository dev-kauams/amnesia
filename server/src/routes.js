import express from 'express'

const routes = express.Router()


const topicos = [
    { id: 1, titulo: "Aprender React", },
    { id: 2, titulo: "Aprender Node.js", },
    { id: 3, titulo: "Aprender TypeScript", }    
                ]

// routes.get("/topicos", (req, res) => {
//     return res.json([{
//         id: 1,
//         titulo: "Aprender React",
//     }])
// })

routes.get("/topicos", (req, res) => {
    return res.json(topicos)
})

routes.get("/topicos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const topico = topicos.find(item => item.id === id)
    const status = topico ? 200 : 404
    return res.status(status).json(topico)
})

export default routes