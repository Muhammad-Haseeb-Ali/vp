const fs = require('fs')
import path from "path";

const directoryPath = e => path.join(process.cwd(), e),
      videosDir = directoryPath("videos")
export default function handler(req, res){
    res.setHeader('Content-Type', 'application/json');
    const id = req.query.id,
    filePath = `${videosDir}/${id}`;
    if(fs.existsSync(filePath)){
        fs.readdirSync(filePath).forEach(file => fs.unlinkSync(filePath + "/" + file));
        fs.rmdirSync(filePath);
        res.status(200).json({
            status:"success"
        })       
    }
    else{
        res.status(404).json({
            status:"not found"
        })
    }
}
