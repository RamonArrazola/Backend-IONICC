import { FileUpload } from "../interfaces/file-upload";
import path from "path";
import fs from "fs";
import uniqid from "uniqid";

export default class FileSystem {
    constructor() {}
    
    SaveTempImage( file: FileUpload, userId: string){

        return new Promise((resolve: any, reject) => {
            // Creart Carpetas
            const path = this.MakeDir(userId);
            
            // Nombre del Archivo
            const fileName = this.UniqueNameGen(file.name);
            
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${fileName}`, (err: any) => {
                if (err){
                    reject(err);
                } else{
                    resolve();
                }
            })
        });      
    }

    private MakeDir(userId: string){
        const pathUsr = path.resolve(__dirname, '../uploads/', userId);

        const pathUsrTemp = pathUsr + '/temp';

        const exists = fs.existsSync(pathUsr);
        if (!exists){
            fs.mkdirSync(pathUsr);
            fs.mkdirSync(pathUsrTemp);
        }

        return pathUsrTemp;
    }

    private UniqueNameGen( nombreOriginal: string){
        const arrName = nombreOriginal.split('.');
        const extension = arrName[arrName.length -1];
        const uniqueId = uniqid();

        return `${ uniqueId}.${extension}`;
    }
}