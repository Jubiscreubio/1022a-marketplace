import {MongoClient} from 'mongodb'
class BancoMongo{
    connection:MongoClient|null = null
    async criarConexao(){
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        this.connection = await client.connect();
    }
    async finalizarConexao(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        await this.connection.close()
    }
    async listar(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const db = this.connection.db("defaultdb");
        const result = db.collection('produtos').find().toArray()
        return result
    }
    async inserir(produto:{id:number,titulo:string,detalhes:string,valor:string,foto:string,categoria:string,estoque:string}){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const db = this.connection.db("defaultdb");
        const result = db.collection('produtos').insertOne(produto)
        return result
    }
    async excluir(id:string){
        const idNumber = parseInt(id)
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const db = this.connection.db("defaultdb");
        const result = db.collection('produtos').deleteOne({id:idNumber})
        return result
    }
    async alterar(id:string,produto:{id?:string,titulo:string,detalhes:string,valor:string,foto:string,categoria:string,estoque:string}){
        const idNumber = parseInt(id)
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const db = this.connection.db("defaultdb");
        const result = db.collection('produtos').updateOne({id:idNumber},{$set:produto})
        return result
    }
    async listarPorId(id:string){
        const idNumber = parseInt(id)
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const db = this.connection.db("defaultdb");
        const result = db.collection('produtos').findOne({id:idNumber})
        return result
    }
}

export default BancoMongo