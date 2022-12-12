const fs = require("fs");
const path = require("path")
const decompress = require("decompress");
import formidable from "formidable";

import connect from "../../../database/connect";
import Proposal from "../../../database/models/propSchema";

const directoryPath = e => path.join(process.cwd(), e),
videosDir = directoryPath("/public/videos")

export default function handler(req, res){
  
  console.log(req.method)
  res.setHeader("Content-Type", "application/json");
  if(req.method !== 'POST')
  {
    res.setHeader('Allow', 'POST');
    res.status(403).json({status: false , discription: req.method + " method is not allowed." })
    return
  }

  // Disable file uploading code
  // const form = new formidable.IncomingForm();
  // form.parse(req,(err, fields, files) => {
  //   if(err && !files.file){
  //     return res.status(404).json({status: false, error: "Error: Request is not parsed correctly"})
  //   }
  //   console.log("----------------------------",form._parser.globalOptions.maxFileSize)
  //   console.log(files, fields);

    const {id,client,discription,publish} = req.body
    console.log(req.body)
  //   decompress(files.zipFile.filepath, videosDir + "/" + id)
  //   .then(files => {
  //     console.log(files)
      
      connect().catch(error => console.log(error))
      const proposal = new Proposal({id,client,discription,publish: publish? JSON.parse(publish) : true})
      proposal.save()
      .then(()=>{
          res.status(200).json(proposal)
      })
  // Disable file uploading code
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     const path = `${videosDir}/${id}`;
  //     if(fs.existsSync(path)){
  //     fs.readdirSync(path).forEach((file) => fs.unlinkSync(path + "/" + file));
  //     fs.rmdirSync(path);
  //     }

  //     res.status(400).json({
  //       status: "fail",
  //       info: `${id} cannot be compress and Published`,
  //       err,
  //     });
  //   });
  // });
}

// Disable file uploading code
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }