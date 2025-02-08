import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import BancoMysql from './db/banco-mysql';
import BancoMongo from './db/banco-mongo';

const app = express();
app.use(express.json());
app.use(cors());

app.get("/produtos", async (req, res) => {
    try {
        const banco = new BancoMysql();
        await banco.criarConexao();
        const result = await banco.listar();
        await banco.finalizarConexao();
        res.send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server ERROR");
    }
});

app.get("/produtos/:codigo", async (req, res) => {
    try {
        const banco = new BancoMysql();
        await banco.criarConexao();
        const result = await banco.listarPorId(req.params.codigo);
        await banco.finalizarConexao();
        res.send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server ERROR");
    }
});

app.post("/produtos", async (req, res) => {
    try {
        const { nome, descricao, preco, imagem } = req.body;
        const banco = new BancoMysql();
        await banco.criarConexao();
        const produto = {
            id: 0, // ID será gerado automaticamente pelo banco de dados
            nome: String(nome) || "",
            descricao: String(descricao) || "",
            preco: preco ? parseFloat(preco).toFixed(2) : "0.00",
            imagem: String(imagem) || ""
        };
        const result = await banco.inserir(produto);
        await banco.finalizarConexao();
        res.send(result); 
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// DELETAR
app.delete("/produtos/:codigo", async (req, res) => {
    try {
        const banco = new BancoMysql();
        await banco.criarConexao();
        const result = await banco.excluir(req.params.codigo);
        await banco.finalizarConexao();
        res.status(200).send("Produto excluído com sucesso código: " + req.params.codigo);
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao excluir");
    }
});

// ALTERAR
app.put("/produtos/:codigo", async (req, res) => {
    try {
        const { nome, descricao, preco, imagem } = req.body;
        const produto = {
            nome: String(nome) || "",
            descricao: String(descricao) || "",
            preco: preco ? parseFloat(preco).toFixed(2) : "0.00",
            imagem: String(imagem) || ""
        };
        const banco = new BancoMysql();
        await banco.criarConexao();
        await banco.alterar(req.params.codigo, produto);
        await banco.finalizarConexao();
        res.status(200).send("Produto alterado com sucesso código: " + req.params.codigo);
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao alterar");
    }
});

app.listen(8000, () => {
    console.log("Iniciei o servidor");
<<<<<<< HEAD
});
=======
});
>>>>>>> a68b698529c0522b2c99b936c71d807b1116e406
