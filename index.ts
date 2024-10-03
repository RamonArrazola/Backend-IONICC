import Server from './classes/server';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './Routes/usuario';
import PostsRoutes from './Routes/post';

const server = new Server();

// BodyParser
server.app.use( bodyParser.urlencoded({extended: true}));
server.app.use( bodyParser.json());

//FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );

//Rutas de mi app
server.app.use( '/user', userRoutes );
server.app.use('/posts', PostsRoutes);

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