import Server from './classes/server';
import userRoutes from './Routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();

// BodyParser
server.app.use( bodyParser.urlencoded({
    extended: true
}));

server.app.use( bodyParser.json());

//Rutas de mi app
server.app.use( '/user', userRoutes );

//Conexion a DB 
mongoose.connect('mongodb://localhost:27017/fotosgram', 
    {
        //useNewUrlParser: true,
        //useCreateIndex: true,
        //Deprecated
    }).then(() => {
        console.log('Base de datos online');
    }).catch((err: any) => {
        throw err;
    });



//Levantar Express
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});