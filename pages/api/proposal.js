import connect from "../../database/connect";
import Proposal from "../../database/models/propSchema";

export default function handler(req, res){
    const {id, client} = req.query;
    console.log(`Proposal API is called with following queries id:${id} and client:${JSON.stringify(client)}`)
    connect().catch(error => console.log(error))
    const proposal = new Proposal({id,client})
    proposal.save()
    .then(()=>{
        res.status(200).json(proposal)
    })
}