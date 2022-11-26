import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const save = await saveFile(files.file);
    if(!save){
      return res.status(422).json({status:"Your file is not saved successfully!"});
    }
    return res.status(201).json({status:"Your file is saved successfully!"});
  });
};

const saveFile = async (file) => {
  try {
    console.warn("-----------------------------------------------------------",
      file,
      "------------------------------------------------------------------------")
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/resources/${file.originalFilename}`, data);
    await fs.unlinkSync(file.filepath);
    return true;
  }
  catch { return false }

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
