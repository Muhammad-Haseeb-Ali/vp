import formidable from "formidable";
import fs from "fs";
import path from "path";

const directoryPath = e => path.join(process.cwd(), e),
      resourcesDir = directoryPath("resources")

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

const post = (req, res) => {
  console.log(req)
  const form = new formidable.IncomingForm({maxFileSize: 1000 * 1024 * 1024});
  form.parse(req,(err, fields, files) => {
    console.log("----------------------------",form._parser.globalOptions.maxFileSize)
    const data = fs.readFileSync(files.file.filepath);
    if (!fs.existsSync(resourcesDir)){
      fs.mkdirSync(resourcesDir);
    }
    fs.writeFileSync(`${resourcesDir}/${files.file.originalFilename}`, data);
    if(!fs.existsSync(`${resourcesDir}/${files.file.originalFilename}`) && fs.existsSync(files.file.filepath))
    {
      fs.unlinkSync(files.file.filepath);
      console.log("temporery stored filr is deleted!")
            return res.status(404).json({status: false, error: "error occure in file creation face"})
    }
     res.status(200).json({status: true , files });
  });
};

export default (req, res) => {
  console.log("Request", req)
  req.method === "POST"
    ? post(req, res)
    : (req,res) => {
      res.status(403).json({status: false , discription: "This method is not allowed." });
    }
};
