import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.get("/produtos", async(req,res)=>{
    //OK -> 0 - Criar o banco de dados e iniciar o servidor de banco.
    //1 - Criar a conexão com o banco
    try{
        const conection = await mysql.createConnection({
<<<<<<< HEAD
            host:process.env.dbhost?process.env.dbhost: "localhost",
            user:process.env.dbuser?process.env.dbuser: "root",
=======
            host:process.env.dbhost?process.env.dbhost:"localhost",
            user:process.env.dbuser?process.env.dbuser:"root",
>>>>>>> f0887942d720f63e06ad7db12e6634c005b57a05
            password:process.env.dbpassword?process.env.dbpassword:"",
            database:process.env.dbname?process.env.dbname:"banco1022a",
            port:process.env.dbport?parseInt(process.env.dbport):3306
        })
        //2 - Realizar uma consulta na tabela
        const [result, fields] = await conection.query("SELECT * from produtos")
        await conection.end()
        //3 - Devolver os dados pra quem pediu
        res.send(result)
    }catch(e){
        res.status(500).send("Server ERROR")
    }
})
app.listen(8000,()=>{
    console.log("Iniciei o servidor")
<<<<<<< HEAD
})
=======
})
>>>>>>> f0887942d720f63e06ad7db12e6634c005b57a05
