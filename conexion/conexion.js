const mongoose = require('mongoose');
const { MONGOLOCAL, MONGOATLAS } = require('./mongo ');

//creamos la conexion a mongo db con mongoose

const getConnection = async () => {
    try {
        await mongoose.connect(MONGOATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //serverApi: ServerApiVersion.v1    
        });
        return 'Conexion a la base local / Atlas exitosa'
        
    } catch (error) {
        console.log(error);
        throw new Error('Error: ' + error.message);
    }

}

module.exports = {
    getConnection}