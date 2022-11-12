const nodemailer = require("nodemailer");


require('dotenv').config()
const sendmail = (req, res)=>{
    // sendmail?id="786"&msg="....."
    res.setHeader('Content-Type', 'application/json');
    const {id, msg} = req.query;

    var transporter = nodemailer.createTransport({
        port: 3000, // Postfix uses port 25
        host: 'localhost',
        service: 'gmail',
        auth: {
          user: 'haseeb.aha786@gmail.com',
          pass: process.env.MAIL_PASS

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
        res.status(200).json({
            status:'success',
            id,
            msg,
            info
        })
    })
      .catch(err=>{
        res.status(200).json({
            status:'fail',
            id,
            msg,
            err
        })
    })

}

module.exports = sendmail