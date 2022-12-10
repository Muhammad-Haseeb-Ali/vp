import formidable from "formidable";
import fs from "fs";
import path from "path";

const directoryPath = e => path.join(process.cwd(), e),
      resourcesDir = directoryPath("/public/resources")

//       uploadMiddleware = multer({
//         storage: multer.diskStorage({
//           destination: function (req, file, cb) {
//             cb(null, "resources");
//           },
//           filename: function (req, file, cb) {
//             cb(null, file.filename + ".zip");
//           }
//         })
//       }).single("file");

export const config = {
  api: {
    bodyParser: false
  }
};

export default function handler(req, res){
  console.log(req)
  if(req.method !== 'POST')
  {
    return res.status(403).json({status: false , discription: "This method is not allowed." })
  }

  const form = new formidable.IncomingForm({
    maxFileSize: 1 * 1024 * 1024,
    keepExtensions: true
  });
  // form.parse(req,(err, fields, files) => {
  //   if(err){
  //     return res.status(404).json({status: false, error: "Error: Request is not parsed correctly"})
  //   }
  //   // console.log("----------------------------",form._parser.globalOptions.maxFileSize)
  //   // const data = fs.readFileSync(files.file.filepath);
  //   // comment for removing fs functionalities
  //   // if (!fs.existsSync(resourcesDir)){
  //   //   fs.mkdirSync(resourcesDir);
  //   // }
  //   // fs.writeFileSync(`${resourcesDir}/${files.file.originalFilename}`, data);
  //   // if(!fs.existsSync(`${resourcesDir}/${files.file.originalFilename}`) && fs.existsSync(files.file.filepath))
  //   // {
  //   //   fs.unlinkSync(files.file.filepath);
  //   //   console.log("temporery stored filr is deleted!")
  //   //         return res.status(404).json({status: false, error: "error occure in file creation face"})
  //   // }
  //    res.status(200).json({status: true});
  // });
  res.status(200).json({status: true});

};
