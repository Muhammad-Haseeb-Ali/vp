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
      bodyParser: false, // Defaults to true. Setting this to false disables body parsing and allows you to consume the request body as stream or raw-body.
      responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
      externalResolver: true, // Disables warnings for unresolved requests if the route is being handled by an external resolver like Express.js or Connect. Defaults to false.
    },
  }

export default function handler(req, res){
  if(req.method !== 'POST')
  {
    res.setHeader('Allow', 'POST');
    return res.status(403).json({status: false , discription: "This method is not allowed." })
  }

  // const form = new formidable.IncomingForm({
  //   maxFileSize: 1 * 1024 * 1024,
  //   keepExtensions: true
  // });
  // form.parse(req,(err, fields, files) => {
  //   if(err){
  //     return res.status(404).json({status: false, error: "Error: Request is not parsed correctly"})
  //   }
  //    res.status(200).json({status: true});
  // });
  res.status(200).json({status: true});

};
