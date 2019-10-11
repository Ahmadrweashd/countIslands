import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Issue = new Schema({
    
    date:{
        type:String ,
        default:'10/10/2019',
    },
    matrix: {
        type: String
    }
});

export default mongoose.model('Issue', Issue) ;