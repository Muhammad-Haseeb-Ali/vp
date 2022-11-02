const fs = require('fs')
export default function handler(req , res){
    const id = req.query.id;
if (fs.existsSync('./public/videos/face/0000.zip')) 
{
    res.status(200).send("Content exist")
}
else{
  res.status(404).send("Content not exist")
}
}

