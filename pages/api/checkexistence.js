import fs from "fs";

export default function handler(req , res){
    const id = req.query.id;
if (fs.existsSync(`/public/videos/${id}.zip`) && fs.existsSync(`/public/videos/${id}`)) 
{
    res.status(200).send("Content exist")
}
else{
  res.status(404).send("Content not exist")
}
}

