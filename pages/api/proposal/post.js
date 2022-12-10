const fs = require("fs");
const path = require("path")
const decompress = require("decompress");
import formidable from "formidable";

import connect from "../../../database/connect";
import Proposal from "../../../database/models/propSchema";

const directoryPath = e => path.join(process.cwd(), e),
videosDir = directoryPath("/public/videos")

export default function handler(req, res){
  res.setHeader("Content-Type", "application/json");
  if(req.method === 'POST')
  {
    console.log(req.method)
    const form = new formidable.IncomingForm();
    form.parse(req,(err, fields, files) => {
      if(err && !files.file){
        return res.status(404).json({status: false, error: "Error: Request is not parsed correctly"})
      }
      console.log("----------------------------",form._parser.globalOptions.maxFileSize)
      console.log(files, fields);

      const {client,published} = fields,
            id = Math.random().toString(36).substring(2) +
            (new Date()).getTime().toString(36);

      decompress(files.zipFile.filepath, videosDir + "/" + id)
      .then(files => {
        console.log(files)
        
        console.log(`Proposal API is called with following queries id:${id} and client:${JSON.stringify(client)}`)
        connect().catch(error => console.log(error))
        const proposal = new Proposal({id,client,published: published? JSON.parse(published) : true})
        proposal.save()
        .then(()=>{
            res.status(200).json(proposal)
        })
      })
      .catch((err) => {
        console.log(err);
        const path = `${videosDir}/${id}`;
        if(fs.existsSync(path)){
        fs.readdirSync(path).forEach((file) => fs.unlinkSync(path + "/" + file));
        fs.rmdirSync(path);
        }
  
        res.status(400).json({
          status: "fail",
          info: `${id} cannot be compress and Published`,
          err,
        });
      });


    });
  }
  else{
    res.status(403).json({status: false , discription: "This method is not allowed." })
  }

}

export const config = {
    api: {
      bodyParser: false
    }
  };