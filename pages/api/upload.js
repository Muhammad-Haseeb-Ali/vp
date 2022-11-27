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

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const {status, file, error} = await saveFile(files.file);
    if(!status){
      return res.status(422).json({ status, discription:"Your file is not saved successfully!", error});
    }
    return res.status(201).json({ status, discription:"Your file is saved successfully!",file});
  });
};

const saveFile = async (file) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`${resourcesDir}/${file.originalFilename}`, data);
    fs.access(`${resourcesDir}/${file.originalFilename}`, fs.F_OK, (err) => {
      if (err) {
        console.log("||||||||||||||||||||||||||||||||||||||||||||||||",err)
        return
      }
      fs.unlinkSync(file.filepath);
      console.log("temporery stored filr is deleted!")
    })

    if(!fs.existsSync(`${resourcesDir}/${file.originalFilename}`))
      return {status: false, error: "error occure in file creation face"}
    else      return {status: true , file };

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
