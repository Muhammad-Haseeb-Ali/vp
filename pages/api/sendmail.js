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
          pass: ''
        }
      });
      
      var mailOptions = {
        from: 'haseeb.aha786@gmail.com',
        to: 'haseeb.aha786@outlook.com',
        subject: `Messsage from ${id} || Video Proposal`,
        text: `${msg}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            res.status(200).send(`Thank you for giving your valuable feedback. ${id} ${client} ${reaction} ${feed}`)
        }
      });


}