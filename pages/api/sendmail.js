var nodemailer = require('nodemailer');
export default function handler(req, res) {
    // feedback?id="786"&client=haseeb&reaction=happy&feed="....."

    const {id, msg} = req.query;

    var transporter = nodemailer.createTransport({
        port: 3000, // Postfix uses port 25
        host: 'localhost',
        service: 'gmail',
        auth: {
          user: 'haseeb.aha786@gmail.com',
          pass: `${process.env.MAIL_APP_PASS}`
        }
      });
      
      var mailOptions = {
        from: 'haseeb.aha786@gmail.com',
        to: 'haseeb.aha786@outlook.com, haseeb.aha786@yahoo.com, haseeb.aha786@aol.com',
        subject: `Video Proposal Messsage from ${id}`,
        text: `${msg}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).send(error)
        } else {
            res.status(200).send(`Thank you for giving your valuable feedback. ${id} ${client} ${reaction} ${feed}`)
        }
      });


}