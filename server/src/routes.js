import express from 'express'
import fs from 'fs/promises'

const routes = express.Router()

const dataTopics = await fs.readFile('./data/topics.json', 'utf-8')

const topicos = JSON.parse(dataTopics)

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
routes.put("/topicos/:id", async (req, res) => {
    const id = Number(req.params.id)
    const { titulo, concluido } = req.body
    const index = topicos.findIndex(item => item.id === id)

    // Tratamento de erro
    if(!titulo || concluido === undefined){
        return res.status(400).json({ message: "[ATENÇÃO]: É obrigatório preencher todos os campos." })
    }

    if (index === -1) {
        console.error()
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado." })
    }

    topicos[index] =
    {
        id: Number(id),
        titulo: titulo,
        concluido: concluido
    }

    
    
    try{
        await fs.writeFile('../../data/topics.json', JSON.stringify(topicos, null, 2), 'utf-8')

        console.log('Dados alterados com sucesso.')
    return res.status(200).json(topicos[index])

    }catch (error) {
        console.error('[ERRO] Falha ao escrever o arquivo:', error);
        return res.status(500).json({ message: "[ERRO]: Falha ao escrever o arquivo." })
    }

})



// Rota PATCH
routes.patch("/topicos/:id", async (req, res) => {
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


     try {
        await fs.writeFile('../../data/topics.json', JSON.stringify(topicos, null, 2), 'utf-8')

        console.log('Dados alterados com sucesso.')
    return res.status(200).json(topicos[index])

     } catch (error) {
        console.error('[ERRO] Falha ao escrever o arquivo:', error);
        return res.status(500).json({ message: "[ERRO]: Falha ao escrever o arquivo." })
     }
})



// Rota POST
routes.post("/topicos", async (req, res) => {
    const { titulo, concluido } = req.body
    const proximoId = topicos.length + 1

    // Tratamento de erro
    if(!titulo){
        return res.status(400).json({ message: "[ATENÇÃO]: É obrigatório preencher todos os campos." })
    }

    const novoTopico =
        {
            id: proximoId,
            titulo: titulo,
            concluido: concluido
        }

    topicos.push(novoTopico)

    try {
        await fs.writeFile('../../data/topics.json', JSON.stringify(topicos, null, 2), 'utf-8')

        console.log("Dados salvos com sucesso.")
    return res.status(201).json(novoTopico)
    } catch (error) {
        console.error('[ERRO] Falha ao escrever o arquivo:', error);
        return res.status(500).json({ message: "[ERRO]: Falha ao escrever o arquivo." })
    }
})


// Rota DELETE
routes.delete("/topicos/:id", async (req, res) => {
    const id = Number(req.params.id)
    const index = topicos.findIndex(item => item.id === id)

    // Tratamento de erro
    if(index === -1){
        return res.status(404).json({ message: "[ERRO]: Objeto não encontrado." })
    }
    topicos.splice(index, 1)

    
    try{
        await fs.writeFile('../../data/topics.json', JSON.stringify(topicos, null, 2), 'utf-8')

        console.log("Dados deletados com sucesso.")
    return res.status(200).json(topicos)
    }catch (error) {
        console.error('[ERRO] Falha ao falha ao deletar o arquivo:', error);
        return res.status(500).json({ message: "[ERRO]: Falha ao deletar o arquivo." })
    }
})

export default routes
