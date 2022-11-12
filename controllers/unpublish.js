const fs = require('fs')
const unpublish = (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const id = req.query.id,
    path = `./videos/${id}`;
    if(fs.existsSync(path)){
        fs.readdirSync(path).forEach(file => fs.unlinkSync(path + "/" + file));
        fs.rmdirSync(path);
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

module.exports = unpublish