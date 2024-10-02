import { Schema, Document, model}from 'mongoose'; 

const postSchema = new Schema({

    created: {
        type: Date
    },
    message: {
        type: String
    },
    img: [{
        type: String
    }],
    coords: {
        type: String    //Latitud, Longitud -+x,-+y 
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, 'Debe de existir una referencia a un usuario']
    }

});

postSchema.pre<IPost>('save', function(next){
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    message: string;
    img: string[];
    coords: string;
    usuario: string;
};

export const Post = model<IPost>('Post', postSchema);