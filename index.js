const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'jesusmiguel',
    database: 'bd_usuarios',
    port: 33066
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;


    const query = 'INSERT INTO usuarios (name, email) values (?, ?);';
    connection.query(query, [name, email], (err, result) => {
        if (err) {
            console.error('Error al insertar datos', err);
            return res.json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () =>{
    console.log(`Servidor Corriendo en http://localhost:${PORT}`)
})