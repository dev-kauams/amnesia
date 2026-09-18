import express from 'express'

const routes = express.Router()

// Array para teste
const topicos = 
    [
        { id: 1, titulo: "Aprender React", },
        { id: 2, titulo: "Aprender Node.js", },
        { id: 3, titulo: "Aprender TypeScript", }    
    ]

// Rota GET Geral
routes.get("/topicos", (req, res) => {
    return res.json(topicos)
})

// Rota GET Específica
routes.get("/topicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const topico = topicos.find(item => item.id === id)
    const status = topico ? 200 : 404

    return res.status(status).json(topico)
})

// Rota PUT
routes.put("/topicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const { titulo } = req.body
    if(!titulo){
        return res.status(400).json({ message: "[ATENÇÃO]: É obrigatório preencher todos os campos." })
    }
    const index = topicos.findIndex(item => item.id === id)

    if (index === -1) {
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado." })
    }

    topicos[index] = {id: Number(id), titulo: titulo} 
    return res.status(200).json(topicos[index])
})

// Rota POST
routes.post("/topicos", (req, res) => {
    const { titulo } = req.body
    if(!titulo){
        return res.status(400).json({ message: "[ATENÇÃO]: É obrigatório preencher todos os campos." })
    }

    const proximoId = topicos.length + 1
    const novoTopico =
        { 
            id: proximoId,
            titulo: titulo,
        }

    topicos.push(novoTopico)
    return res.status(201).json(novoTopico)
})

// Rota DELETE
routes.delete("/topicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const index = topicos.findIndex(item => item.id === id)
    if(index === -1){
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado." })
    }    
    topicos.splice(index, 1)

    return res.status(200).json(topicos)
})

export default routes