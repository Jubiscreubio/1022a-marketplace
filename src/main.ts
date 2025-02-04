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
<<<<<<< HEAD
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "mysql-marketplace-estudante-57dd.f.aivencloud.com",
            user: process.env.dbuser ? process.env.dbuser : "avnadmin",
            password: process.env.dbpassword ? process.env.dbpassword : "AVNS_0a_3E2vf_5P_Q1FJapL",
            database: process.env.dbname ? process.env.dbname : "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 13293
        })
        const [result, fields] = await connection.query("SELECT * from produtos")
        await connection.end()
        res.send(result)
    } catch (e) {
        res.status(500).send("Server ERROR")
    }
})
app.post("/produtos", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "mysql-marketplace-estudante-57dd.f.aivencloud.com",
            user: process.env.dbuser ? process.env.dbuser : "avnadmin",
            password: process.env.dbpassword ? process.env.dbpassword : "AVNS_0a_3E2vf_5P_Q1FJapL",
            database: process.env.dbname ? process.env.dbname : "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 13293
        })
        const {id,nome,descricao,preco,imagem} = req.body
        const [result, fields] = 
                    await connection.query("INSERT INTO produtos VALUES (?,?,?,?,?)",
                            [id,nome,descricao,preco,imagem])
        await connection.end()
=======
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listar()
        await banco.finalizarConexao()
>>>>>>> bd49c6ad0faf8e511e0867fbd91a9cbb0a6d6271
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})
app.get("/produtos/:id", async (req, res) => {
    try {
<<<<<<< HEAD
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "mysql-marketplace-estudante-57dd.f.aivencloud.com",
            user: process.env.dbuser ? process.env.dbuser : "avnadmin",
            password: process.env.dbpassword ? process.env.dbpassword : "AVNS_0a_3E2vf_5P_Q1FJapL",
            database: process.env.dbname ? process.env.dbname : "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 13293
        })
        const [result, fields] = await connection.query("SELECT * from usuarios")
        await connection.end()
=======
        
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listarPorId(req.params.id)
        await banco.finalizarConexao()
>>>>>>> bd49c6ad0faf8e511e0867fbd91a9cbb0a6d6271
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})
<<<<<<< HEAD

app.get("/cadastro-carrinho", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "mysql-marketplace-estudante-57dd.f.aivencloud.com",
            user: process.env.dbuser ? process.env.dbuser : "avnadmin",
            password: process.env.dbpassword ? process.env.dbpassword : "AVNS_0a_3E2vf_5P_Q1FJapL",
            database: process.env.dbname ? process.env.dbname : "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 13293
        })
        const [result, fields] = await connection.query("SELECT * from carrinho")
        await connection.end()
        res.send(result)
=======
app.post("/produtos", async (req, res) => {
    try {
        const {id,nome,descricao,preco,imagem} = req.body
        const banco = new BancoMysql()
        await banco.criarConexao()
        const produto = {id:parseInt(id),nome,descricao,preco,imagem}
        const result = await banco.inserir(produto)
        await banco.finalizarConexao()
        res.send(result) 
>>>>>>> bd49c6ad0faf8e511e0867fbd91a9cbb0a6d6271
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//DELETAR
app.delete("/produtos/:id",async(req,res)=>{
    try{
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.excluir(req.params.id)
        await banco.finalizarConexao()
        res.status(200).send("Produto excluido com sucesso id: "+req.params.id)
    }
    catch(e){
        console.log(e)
        res.status(500).send("Erro ao excluir")
    }
    
})

//ALTERAR
app.put("/produtos/:id",async(req,res)=>{
    const {nome,descricao,preco,imagem} = req.body
    const produto = {nome,descricao,preco,imagem}
    const banco = new BancoMysql()
    await banco.criarConexao()
    const result = await banco.alterar(req.params.id,produto)
    await banco.finalizarConexao()
    res.status(200).send("Produto alterado com sucesso id: "+req.params.id)
})

app.listen(8000, () => {
    console.log("Iniciei o servidor")
})