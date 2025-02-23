import dotenv from 'dotenv';
dotenv.config();  
import mongoose from 'mongoose';

class dbClient {

    constructor(){
        this.conectarBaseDatos();
    }
    async conectarBaseDatos() {
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/Verriss?retryWrites=true&w=majority`;
        await mongoose.connect(queryString);
        console.log('Conexión a MongoDB exitosa');
    }

    async cerrarConexion(){
        try {
            await mongoose.disconnect();
            console.log('Conexión a MongoDB cerrada');
        } catch (e) {
            console.log(e);
        }
    }

}

export default new dbClient();
