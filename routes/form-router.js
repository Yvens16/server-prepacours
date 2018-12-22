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




// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
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
        from: "yvensbelaston@gmail.com", // sender address
        to: "yvensbelaston@gmail.com", // list of receivers
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
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//         res.render('contact', {msg: 'Email has been sent'});
//     });
// });

})



module.exports = router;