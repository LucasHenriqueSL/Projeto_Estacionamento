const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "banco",
});

// app.get('/', (req, res) =>{
//     db.query("INSERT INTO banco.usuarios (email,password) VALUES ('lucas@gmail.com', '12345678')", (err, result) => {
//         if(err){
//             console.log(err);
//         }
//     });
// });


app.use(express.json());
app.use(cors());

app.post('/cadastro', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM banco.usuarios WHERE email = ?", [email],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length == 0) {
                db.query("INSERT INTO banco.usuarios (email, password) values (?, ?)",
                    [email, password],
                    (err, response) => {
                        if (err) {
                            res.send(err);
                        }
                        res.send({ msg: "Cadastrado com sucesso" });
                    }
                );

            } else {
                res.send({ msg: "Email já cadastrado" });
            }

        });
});


app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            res.send({ msg: "Usuário logado com sucesso" });
        }
        else{
            res.send({ msg: "Usuário não encontrado" });
        }
    })
});


app.listen(3001, () => {
    console.log("rodando na porta 3001");
});