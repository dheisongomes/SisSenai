const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();

// Configurações do servidor
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());// Necessário para o carrinho de compras (JSON)
app.use(express.static('.'));// Serve seus arquivos HTML, CSS e imagens

// Conexão com o banco de dados
const db = new sqlite3.Database('./sissenai.db');

// Inicialização das tabelas (Cria apenas se não existirem)
db.serialize(() => {
  // Tabela de Clientes
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
  id INTERGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  cpf TEXT,
  telefone TEXT,
  )`);

  // --- Rotas de Clientes ---
  app.post('/salvar-cliente',(req,res) => {
    const {nome,cpf,telefone} = req.body;
    db.run(`INSERT INTO clientes (nome, cpf,telefone) VALUES (?, ?, ?)`,[nome, cpf, telefone], (err) => {
      res.redirect('/clientes.html');
    });
  });

             app.get('/listar-clientes',(req,res) => {
               db.all("SELECT*FROM clientes", [], (err,rows) => {
                 if (err) return res.status(500).json(err);
                 res.json(rows);
               });
             });


   // Iniciar Servidor
             const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`SISSENAI RODANDO EM: http://localhost:${PORT}`);
    console.log(`=========================================`);
  });
  
