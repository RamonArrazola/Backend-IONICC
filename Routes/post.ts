import { Router, Response } from "express";
import { verificaToken } from "../middlewares/auth";
import { Post } from "../models/post.model";

const PostRoutes = Router();

// Crear Posts

PostRoutes.post('/', [verificaToken], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    Post.create( body ).then( async postDB => {

        await postDB.populate('usuario', '-password'); //Ya no hay necesidad de usar execPopulate()

        res.json({
            ok: true,
            post: postDB
        });

    }).catch(err => {

        res.json(err);
    });

});


// Obtener Posts por Paginas
PostRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1; 
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({_id: -1})
                            .limit(10)
                            .populate('usuario', '-password')
                            .skip( skip )
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});

export default PostRoutes;