import mysql, { Connection } from 'mysql2/promise';

class BancoMysql {
    private conexao: Promise<Connection>;
    constructor() {
        this.conexao = mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022a",
            port: process.env.dbport ? parseInt(process.env.dbport) : 28355
        });
    }

    async getConnection() {
        const conn = await this.conexao; 
        return conn;
    }

    async end() {
        const conn = await this.conexao; 
        await conn.end();
    }

    async listar(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from produtos");
        return result
    }
    async inserir(produto:{id:number,nome:string,descricao:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO produtos (id,nome,descricao,imagem) VALUES (?,?,?,?)"
        const parametro = [produto.id,produto.nome,produto.descricao,produto.imagem]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async excluir(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM produtos WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterar(id:string,produto:{id?:string,nome:string,descricao:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE produtos SET nome=?,descricao=?,imagem=? WHERE id = ?"
        const parametro = [produto.nome,produto.descricao,produto.imagem,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async listarUser(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from usuarios");
        return result
    }
    async inserirUser(usuario:{id:number,nome:string,funcao:string,email:string,foto:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO usuarios (id,nome,funcao,email,foto) VALUES (?,?,?,?,?)"
        const parametro = [usuario.id,usuario.nome,usuario.funcao,usuario.email,usuario.foto]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async excluirUser(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM usuarios WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterarUser(id:string,usuario:{id?:string,nome:string,funcao:string,email:string,foto:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE usuarios SET nome=?,funcao=?,email=?,foto=? WHERE id = ?"
        const parametro = [usuario.nome,usuario.funcao,usuario.email,usuario.foto,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
}

export default BancoMysql;