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
 // insertamos nuevos clientes
app.post('/usuarios', async (req, res) => {
    console.log(req.body);
    const { nombre, apellido, email, password } = req.body;

    console.log(`Mi nombre es ${nombre}, mi apellido es ${apellido}, mi email es ${email} y el password ${password}`);

    const nuevoUsuario = new Usuario(req.body);

    console.log(`3. Nuevo Usuario a guardar: ${nuevoUsuario}`);

    
    //7. Insertamos en la Database el nuevo usuario
    await nuevoUsuario.save();

    
});

// obtenemos toda la lista de clientes

app.get('/clientes', async (req, res) => {

    const personas = await Usuario.find({}, 
        {
        "nombre": 1, 
        "apellido":1, 
        "email": 1,
        "timestamp": 1
        }); 


        
console.log(personas);

res.json({
    personas
    })
})

// eliminamos los datos del cliente

app.delete('/clientes/:id', async (req, res) => {
    
    const id = req.params.id;

    console.log(id);

    try {
        const deleteUser = await Usuario.findByIdAndDelete(id);
        console.log(deleteUser);
        if (!deleteUser) {
            return res.status(404).send();
        }else {
            console.log('cliente eliminado');
            return res.status(200).send();
        }
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el Puerto ${PORT}`);
})