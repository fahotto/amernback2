const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
require('./conexion/conexion')
const Usuario = require('./DBmodels/newUser');
 
const app = express();
     
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`<h1>Soy el Back del MERN</h1>`)
});
 
app.post('/usuarios', async (req, res) => {
    console.log(req.body);
    const { nombre, apellido, email, password } = req.body;

    console.log(`Mi nombre es ${nombre}, mi apellido es ${apellido}, mi email es ${email} y el password ${password}`);

    const nuevoUsuario = new Usuario (req.body);

    console.log(`3. Nuevo Usuario a guardar: ${nuevoUsuario}`);

    
    //7. Insertamos en la Database el nuevo usuario
    await nuevoUsuario.save();

    
});

const { getConnection } = require('./conexion/conexion')

//la conexxion a la base de datos de MongoLocal

getConnection().then ((mensaje) => {
    console.log(mensaje);
}).catch((err) => {
    console.log(err);
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el Puerto ${PORT}`);
})