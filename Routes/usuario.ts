import { Router, Request, Response} from 'express';
import { Usuario } from '../models/user.model';
import bcrypt from 'bcrypt';

const userRoutes = Router();

//Login
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;

    Usuario.findOne({ email: body.email }).then((userDB: any) => {
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if (userDB.comparePass(body.password)) {
            res.json({
                ok: true,
                token: 'adjkshfgadhksfghjadsfghjadfghjkls'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos*'
            });
        }
    }).catch((err: any) => {
        res.json({
            ok: false,
            err: err
        });
    });
})


//Crear un usuario 
/*userRoutes.get('/prueba', (req: Request, res: Response) =>{
    res.json({
        ok:'true', 
        usuario:'prueba',
        pass: '123'})
});*/

userRoutes.post('/create', (req: Request, res: Response) =>{
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password:  bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    }

    Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user: userDB
        });

    }).catch(err => {
        res.json({
            ok: false,
            err: err
        });
    })
});


export default userRoutes;