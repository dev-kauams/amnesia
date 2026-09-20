import express from 'express'

const routes = express.Router()

// Array para teste
const topicos = 
    [
        { id: 1, titulo: "Aprender React", concluido: false },
        { id: 2, titulo: "Aprender Node.js", concluido: false },
        { id: 3, titulo: "Aprender TypeScript", concluido: true }    
    ]

// Rota GET Geral
routes.get("/topicos", (req, res) => {
    return res.status(200).json(topicos)
})

// Rota GET Específica
routes.get("/topicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const topico = topicos.find(item => item.id === id)

    // Tratamento de erro
    if(!topico){
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado." })
    }

    return res.status(200).json(topico)
})

// Rota PUT
routes.put("/topicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const { titulo, concluido } = req.body
    const index = topicos.findIndex(item => item.id === id)

    // Tratamento de erro
    if(!titulo || concluido === undefined){
        return res.status(400).json({ message: "[ATENÇÃO]: É obrigatório preencher todos os campos." })
    }

    if (index === -1) {
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado." })
    }

    topicos[index] = 
    { 
        id: Number(id), 
        titulo: titulo, 
        concluido: concluido
    }

    return res.status(200).json(topicos[index])
})


// Rota PATCH
routes.patch("/topicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const { titulo, concluido } = req.body
    const index = topicos.findIndex(item => item.id === id)

    // Tratamento de erro
    if(titulo !== undefined && (typeof titulo !== "string" || titulo.trim() === "")){
        return res.status(400).json({ message: "[ATENÇÃO]: O título deve ser um texto válido." })
    }
    if(!titulo && concluido === undefined){
        return res.status(400).json({ message: "[ATENÇÃO]: É obrigatório preencher ao menos 1(um) dos campos devem ser preenchidos." })
    }
    if(index === -1){
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado."})
    }

    topicos[index] = 
    {
        ...topicos[index],
        ...req.body,
        id: id
    }

    return res.status(200).json(topicos[index])
})

// Rota POST
routes.post("/topicos", (req, res) => {
    const { titulo } = req.body
    const proximoId = topicos.length + 1

    // Tratamento de erro
    if(!titulo){
        return res.status(400).json({ message: "[ATENÇÃO]: É obrigatório preencher todos os campos." })
    }

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

    // Tratamento de erro
    if(index === -1){
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado." })
    }    
    topicos.splice(index, 1)

    return res.status(200).json(topicos)
})

export default routes