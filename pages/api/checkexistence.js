import fs from "fs";

export default function handler(req , res){
    const id = req.query.id;
if (fs.existsSync(`./public/videos/${id}/screen.mp4`) && fs.existsSync(`./public/videos/${id}/face.mp4`)) 
{
    res.status(200).send("Content exist")
}
else{
  res.status(404).send("Content not exist")
}
}

