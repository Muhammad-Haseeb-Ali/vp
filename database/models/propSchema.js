import mongoose from "mongoose";

const propSchema = new mongoose.Schema({
    id:String,
    client:{
        type:String,
        default: 'you'
    },
    discription:{
        type:String,
        require:true
    },
    publish:{
        type: Boolean,
        default: true,
        require: true
    }
})
    const Proposal =  mongoose.model('Proposal', propSchema)

export default Proposal;