const fs = require("fs");
const path = require("path")
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
  const directoryPath = e => path.join("/tmp", e),
      resourcesDir = directoryPath("/resources"),
      videosDir = directoryPath("/videos")
      if (!fs.existsSync(resourcesDir)){
        fs.mkdirSync(resourcesDir);
      }
  res.setHeader("Content-Type", "application/json");
  if (!fileExistsSync(`${resourcesDir}/${id}.zip`)) {
    return res.status(400).json({
      status: "not found",
      info: `${id} Proposal is not uploaded on server yet`,
    });
  }
  decompress(`${resourcesDir}/${id}.zip`, videosDir + "/" + id)
    .then(files => {
      console.log(files)
      res.status(200).json({
        status: "success",
        info: `${id} Proposal have been Published`,
      });
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
        info: `${id} cannot be compress and Published due to this ERROR: ${err}`,
        err,
      });
    });
};
