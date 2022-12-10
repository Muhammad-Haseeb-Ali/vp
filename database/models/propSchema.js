import mongoose from "mongoose";

const propSchema = new mongoose.Schema({
    id:String,
    client:{
        type:String,
        default: 'you'
    }
})
    const Proposal = mongoose.model('Proposal') ||  mongoose.model('Proposal', propSchema)

export default Proposal;