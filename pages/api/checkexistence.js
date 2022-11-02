import fs from "fs";

export default function handler(req , res){
    const id = req.query.id;
if ((fs.existsSync(`./public/videos/screen/${id}.mp4`) && fs.existsSync(`./public/videos/face/${id}.mp4`)) || (fs.existsSync(`./public/videos/screen/${id}.zip`) && fs.existsSync(`./public/videos/face/${id}.zip`))) 
{
    res.status(200).send("Content exist")
}
else{
  res.status(404).send("Content not exist")
}
}

