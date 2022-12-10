export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req, res){
  if(req.method !== 'POST')
  {
    res.setHeader('Allow', 'POST');
    return res.status(403).json({status: false , discription: "This method is not allowed." })
  }
  res.status(200).json({status: true});

};
