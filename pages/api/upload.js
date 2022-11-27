import formidable from "formidable";
import fs from "fs";

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
    const save = await saveFile(files.file);
    if(save.status && save.status == false){
      return res.status(422).json({ status: false, discription:"Your file is not saved successfully!", error: save.error || "error occure in file creation face"});
    }
    return res.status(201).json({ staus: true, discription:"Your file is saved successfully!"});
  });
};

const saveFile = async (file) => {
  try {
    console.warn("-----------------------------------------------------------",
      file,
      "------------------------------------------------------------------------")
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/resources/${file.originalFilename}`, data);
    if(fs.existsSync(`./public/resources/${file.originalFilename}`)){
      fs.unlinkSync(file.filepath);
      return true;
    }
    else
    return {status: false }
  }
  catch(error) { return {status: false, error }}

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
