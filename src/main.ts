import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import BancoMysql from './db/banco-mysql'
import BancoMongo from './db/banco-mongo'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/produtos", async (req, res) => {
    try {
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listar()
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})

app.get("/produtos/:codigo", async (req, res) => {
    try {
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listarPorId(req.params.codigo)
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})

app.post("/produtos", async (req, res) => {
    try {
        const { titulo, detalhes, valor, foto, categoria, estoque } = req.body
        const banco = new BancoMysql()
        await banco.criarConexao()
        const produto = {
            id: 0, // ID será gerado automaticamente pelo banco de dados
            titulo: String(titulo) || "",
            detalhes: String(detalhes) || "",
            valor: valor ? parseFloat(valor).toFixed(2) : "0.00",
            foto: String(foto) || "",
            categoria: String(categoria) || "",
            estoque: String(estoque ? parseInt(estoque) : 0)
        }
        const result = await banco.inserir(produto)
        await banco.finalizarConexao()
        res.send(result) 
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

// DELETAR
app.delete("/produtos/:codigo", async (req, res) => {
    try {
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.excluir(req.params.codigo)
        await banco.finalizarConexao()
        res.status(200).send("Produto excluído com sucesso código: " + req.params.codigo)
    } catch (e) {
        console.log(e)
        res.status(500).send("Erro ao excluir")
    }
})

// ALTERAR
app.put("/produtos/:codigo", async (req, res) => {
    try {
        const { titulo, detalhes, valor, foto, categoria, estoque } = req.body
        const produto = {
            titulo: String(titulo) || "",
            detalhes: String(detalhes) || "",
            valor: valor ? parseFloat(valor).toFixed(2) : "0.00",
            foto: String(foto) || "",
            categoria: String(categoria) || "",
            estoque: String(estoque ? parseInt(estoque) : 0)
        }
        const banco = new BancoMysql()
        await banco.criarConexao()
        await banco.alterar(req.params.codigo, produto)
        await banco.finalizarConexao()
        res.status(200).send("Produto alterado com sucesso código: " + req.params.codigo)
    } catch (e) {
        console.log(e)
        res.status(500).send("Erro ao alterar")
    }
})

app.listen(8000, () => {
    console.log("Iniciei o servidor")
})