const fs = require("fs");
const decompress = require("decompress");

const fileExistsSync = (file) => {
  try {
      fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
}

export default function handler(req, res){
  const id = req.query.id;
  console.log(id)
  res.setHeader("Content-Type", "application/json");
  if (!fileExistsSync(`./public/resources/${id}.zip`)) {
    return res.status(400).json({
      status: "not found",
      info: `${id} Proposal is not uploaded on server yet`,
    });
  }
  decompress(`./public/resources/${id}.zip`, `./public/videos/`)
    .then(files => {
      console.log(files)
      res.status(200).json({
        status: "success",
        info: `${id} Proposal have been Published`,
      });
    })
    .catch((err) => {
      console.log(err);
      const path = `./public/videos/${id}`;
      if(fs.existsSync(path)){
      fs.readdirSync(path).forEach((file) => fs.unlinkSync(path + "/" + file));
      fs.rmdirSync(path);
      }

      res.status(400).json({
        status: "fail",
        info: `${id} cannot be compress and Published due to this ERROR: ${err}`,
        err,
      });
    });
};
