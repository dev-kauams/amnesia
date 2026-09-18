import express from 'express'

const routes = express.Router()


const topicos = 
    [
        { id: 1, titulo: "Aprender React", },
        { id: 2, titulo: "Aprender Node.js", },
        { id: 3, titulo: "Aprender TypeScript", }    
    ]


routes.get("/topicos", (req, res) => {
    return res.json(topicos)
})

routes.get("/topicos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const topico = topicos.find(item => item.id === id)
    const status = topico ? 200 : 404

    return res.status(status).json(topico)
})

routes.put("/topicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const {titulo} = req.body
    if(!titulo){
        return res.status(400).json({message: "Os dados são obrigatórios"})
    }
    const index = topicos.findIndex(item => item.id === id)

    if (index === -1) {
        return res.status(404).json({message: "ID não encontrado."})
    }

    topicos[index] = {id: Number(id), titulo: titulo} 
    return res.status(200).json(topicos[index])
})

export default routes