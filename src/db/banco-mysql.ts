import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

class BancoMysql {
    // Atributos da classe
    connection: Connection | null = null;

    // Métodos
    async criarConexao() {
        this.connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "mysql-marketplace-estudante-57dd.f.aivencloud.com",
            user: process.env.dbuser ? process.env.dbuser : "avnadmin",
            password: process.env.dbpassword ? process.env.dbpassword : "AVNS_0a_3E2vf_5P_Q1FJapL",
            database: process.env.dbname ? process.env.dbname : "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 13293
        });
    }

    async consultar(query: string, params?: any[]) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result, fields] = await this.connection.query(query, params);
        return result;
    }

    async finalizarConexao() {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        await this.connection.end();
    }

    async listar() {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result, fields] = await this.connection.query("SELECT * FROM produtos");
        return result;
    }

    async inserir(produto: { id: number, nome: string, descricao: string, preco: string, imagem: string }) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result, fields] = await this.connection.query(
            "INSERT INTO produtos (id, nome, descricao, preco, imagem) VALUES (?, ?, ?, ?, ?)",
            [produto.id, produto.nome, produto.descricao, produto.preco, produto.imagem]
        );
        return result;
    }

    async excluir(id: string) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result, fields] = await this.connection.query("DELETE FROM produtos WHERE id = ?", [id]);
        return result;
    }

    async alterar(id: string, produto: { nome: string, descricao: string, preco: string, imagem: string }) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result, fields] = await this.connection.query(
            "UPDATE produtos SET nome=?, descricao=?, preco=?, imagem=? WHERE id=?",
            [produto.nome, produto.descricao, produto.preco, produto.imagem, id]
        );
        return result;
    }

    async listarPorId(id: string) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
        const [result, fields] = await this.connection.query("SELECT * FROM produtos WHERE id = ?", [id]) as RowDataPacket[];
        return result[0];
    }
}

export default BancoMysql;
