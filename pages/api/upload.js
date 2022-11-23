const multer = require("multer");
import nextConnect from 'next-connect';

export default function handler (req, res){
  console.log(req)
  return(res.status(200).json({"status":"succeed"}))
  
}

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// }),
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

// apiRoute.use(uploadMiddleware);
// apiRoute.post((req, res) => {
//   res.status(200).json({ data: 'success' });
// })


// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

