const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "db_retrogames"
})

db.connect((erro)=>{
    if(erro){
        console.error("Erro ao conectar:", erro)
    }else{
        console.log("Conectado ao DB")
    }
})

const mostrarJogos = (req, res) => {
    const sql = "SELECT titulo , plataforma, desenvolvedora, imagem_url AS imagem, preco FROM jogos"
    db.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro: "Erro ao consultar o BD"})
        }
        res.json(resultado)
    })
}
//titulo, plataforma, desenvolvedora, imagem_url, preco
const cadastrarJogo = (req, res) => {
    const { titulo, plataforma, desenvolvedora, imagem, preco } = req.body

    if(titulo && plataforma && desenvolvedora && imagem && preco){
        const sql = "INSERT INTO jogos (titulo, plataforma, desenvolvedora, imagem_url, preco) VALUES (?, ?, ?, ?, ?)"
        const valores = [titulo, plataforma, desenvolvedora, imagem, preco]

        db.query(sql, valores, (erro, resultado) => {
            if(erro){
                return res.status(500).json({erro: "Erro ao cadastrar jogo"})
    
            }
            res.send("Jogo cadastrado com sucesso")
        })
    }else{
        res.status(400).json({erro: "Erro: preencha todos os campos"})
    }
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 3000

app.get("/listar", mostrarJogos)
app.post("/cadastrar", cadastrarJogo)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})