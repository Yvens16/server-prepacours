const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/form', (req, res, next) => {
  const output = `
  <h1>We have a new lead</h1>
  <ul>
    <li>name: ${req.body.name} </li>
    <li>numéro de téléphone: ${req.body.phone} </li>
    <li>Difficulté dans quels matière: ${req.body.diff}</li>
    <li>Comment l'aider vous? : ${req.body.help}</li>
    <li>À rappeller le: ${req.body.date}</li>
  </ul>`;
  

  console.log('output', output);
    let transporter = nodemailer.createTransport({
        service:'Gmail',
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
        },
        tls:{
          rejectUnauthorized: false
        }
    });

//     // setup email data with unicode symbols
    let mailOptions = {
        from: process.env.MAIL, // sender address
        to: process.env.MAIL2, // list of receivers
        subject: 'New Lead ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                res.json({
                    msg: 'fail'
                })
            } else {
                res.json({
                    msg: 'sucess'
                })
            }
        })
})



module.exports = router;