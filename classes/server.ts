import express from 'express';
import cors from 'cors';

export default class Server {
    public app: express.Application;
    public port: number = 3000; 

    constructor(){
        this.app = express();
    }

    start(callback: Function){
        this.app.listen(this.port, callback());
    }
}