const user = require('../DBmodels/newUser');

const nuevoUsuario = async (req, res) => {
    
     
    const { nombre, apellido, email, password } = req.body;
    
    //3. Verificar si el usuario ya existe
    try {
        let usuarioExiste = await user.findOne({email}) 
        console.log(`2. Existe: ${usuarioExiste}`);

        if(usuarioExiste){
            return res.status(400).json({
                errores: 'El ususario ya existe'
            })
        }

    //4. si no Existe, creamos un nuevo usuario
    const nuevoUsuario = new user (req.body);

    console.log(`3. Nuevo Usuario a guardar: ${nuevoUsuario}`);

    
    //7. Insertamos en la Database el nuevo usuario
    await nuevoUsuario.save();

    //6. Respondemos a la petición del cliente si todo va bien
    res.status(200).render('recibido')

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Nuestros mejores Deps están trabajando para solucionar el Problem'
        })
    }
}

module.exports = { nuevoUsuario } 
