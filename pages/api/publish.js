const fs = require("fs");
const decompress = require("decompress");


function publish(req, res){
  const id = req.query.id;
  res.setHeader("Content-Type", "application/json");
  if (!fs.existsSync(`./resources/${id}.zip`)) {
    return res.status(400).json({
      status: "not found",
      info: `${id} Proposal is not uploaded on server yet`,
    });
  }
  decompress(`./resources/${id}.zip`, `./videos/${id}`)
    .then(files => {
      console.log(files)
      res.status(200).json({
        status: "success",
        info: `${id} Proposal have been Published`,
      });
    })
    .catch((err) => {
      console.log(err);
      const path = `./videos/${id}`;
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

export default handler = publish