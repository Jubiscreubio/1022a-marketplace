import mysql , { Connection, RowDataPacket } from 'mysql2/promise'
class BancoMysql{
    //Atributos de uma classe
    connection:Connection|null = null
    
    
    //Métodos
    async criarConexao(){
        this.connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "mysql-marketplace-estudante-57dd.f.aivencloud.com",
            user: process.env.dbuser ? process.env.dbuser : "avnadmin",
            password: process.env.dbpassword ? process.env.dbpassword : "AVNS_0a_3E2vf_5P_Q1FJapL",
            database: process.env.dbname ? process.env.dbname : "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 13293
        })
    }
    async consultar(query:string,params?:any[]){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query(query,params)
        return result
    }
    async finalizarConexao(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        await this.connection.end()
    }
    async listar(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM produtos")
        return result
    }
    async inserir(produto:{id:number,titulo:string,detalhes:string,valor:string,foto:string,categoria:string,estoque:string}){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("INSERT INTO produtos VALUES (?,?,?,?,?)",[produto.id,produto.titulo,produto.detalhes,produto.valor,produto.foto,produto.categoria,produto.estoque])
        return result
    }
    async excluir(id:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("DELETE FROM produtos WHERE id = ?",[id])
        return result
    }
    async alterar(id:string,produto:{id?:string,titulo:string,detalhes:string,valor:string,foto:string,categoria:string,estoque:string}){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("UPDATE produtos SET titulo=?,detalhes=?,valor=?,foto=?,categoria=?,estoque=?   WHERE id=?",[produto.id,produto.titulo,produto.detalhes,produto.valor,produto.foto,produto.categoria,produto.estoque])
        return result
    }
    async listarPorId(id:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM produtos WHERE id = ?",[id]) as RowDataPacket[]
        return result[0]
    }
}

    

export default BancoMysql