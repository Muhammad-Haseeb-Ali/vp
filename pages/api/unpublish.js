const fs = require('fs')
export default function handler(req, res){
    res.setHeader('Content-Type', 'application/json');
    const id = req.query.id,
    filePath = `./public/videos/${id}`;
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
