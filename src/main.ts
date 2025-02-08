import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
const app = express()
app.use(express.json())
app.use(cors())

import BancoMysql from './db/banco-mysql'

app.get("/produtos",async(req,res)=>{
    try{
        const banco = new BancoMysql();
        const result = await banco.listar()
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})

app.post("/produtos",async(req,res)=>{
    try{
        const {id,nome,descricao,imagem} = req.body
        console.log(id,nome,descricao,imagem)
        const banco = new BancoMysql();

        const produto = {id:parseInt(id),nome,descricao,imagem}

        const result = await banco.inserir(produto)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})

app.delete("/produtos/:id",async (req,res)=>{
    console.log("Tentando excluir o produto de id:",req.params.id)
    try{
        const sqlQuery = "DELETE FROM produtos WHERE id = ?"
        const parametro = [req.params.id]

        const banco = new BancoMysql();

        const result = await banco.excluir(req.params.id)

        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})
app.put("/produtos/:id",async (req,res)=>{
    console.log("Tentando alterar o produto de id:",req.params.id)
    try{
        const {nome,descricao,imagem} = req.body
        const exercicio = {nome,descricao,imagem}

        const banco = new BancoMysql();

        const result = await banco.alterar(req.params.id,exercicio)

        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})

app.get("/usuarios",async(req,res)=>{
    try{
        const banco = new BancoMysql();
        const result = await banco.listarUser()
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})

app.post("/usuarios",async(req,res)=>{
    try{
        const {id,nome,funcao,email,foto} = req.body
        console.log(id,nome,funcao,email,foto)
        const banco = new BancoMysql();

        const usuario = {id:parseInt(id),nome,funcao,email,foto}

        const result = await banco.inserirUser(usuario)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})

app.delete("/usuarios/:id",async (req,res)=>{
    console.log("Tentando excluir o usuario de id:",req.params.id)
    try{
        const sqlQuery = "DELETE FROM usuarios WHERE id = ?"
        const parametro = [req.params.id]

        const banco = new BancoMysql();

        const result = await banco.excluirUser(req.params.id)

        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})
app.put("/usuarios/:id",async (req,res)=>{
    console.log("Tentando alterar o usuario de id:",req.params.id)
    try{
        const {nome,funcao,email,foto} = req.body
        const usuario = {nome,funcao,email,foto}

        const banco = new BancoMysql();

        const result = await banco.alterarUser(req.params.id,usuario)

        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})



//INICIAR O SERVIDOR
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
})