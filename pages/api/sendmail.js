const nodemailer = require("nodemailer");

export default function handler(req, res){
    // sendmail?id="786"&msg="....."
    res.setHeader('Content-Type', 'application/json');
    const {id, msg} = req.query;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'haseeb.aha786@gmail.com',
          pass: process.env.MAIL_APP_PASS

        }
      });
      
      var mailOptions = {
        from: 'haseeb.aha786@gmail.com',
        to: 'haseeb.aha786@outlook.com, haseeb.aha786@yahoo.com, haseeb.aha786@aol.com',
        subject: `Video Proposal Messsage from ${id}`,
        text: `${msg}`
      };
      
      transporter.sendMail(mailOptions)
      .then(info=>{
        console.log("succed to send mail notification")
        return(
                  res.status(200).json({
            status:'success',
            id,
            msg,
            info
        })
        )

    })
      .catch(err=>{
        console.log("error:",err)
        return(
               res.status(404).json({
            status:'fail',
            id,
            msg,
            err
        })   
        )

    })

}
