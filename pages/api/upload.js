import formidable from "formidable";
import path from "path";
import fs from "fs";

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
  const form = new formidable.IncomingForm();
  form.parse(req,(err, fields, files) => {
    console.log(files)
    const data = fs.readFileSync(files.file.filepath);
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
    : req.method === "PUT"
      ? console.log("PUT")
      : req.method === "DELETE"
        ? console.log("DELETE")
        : req.method === "GET"
          ? console.log("GET")
          : res.status(404).send("");
};
