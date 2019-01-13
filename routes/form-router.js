const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
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

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: 'maths@xn--prpacours-c4a.fr',
    from: 'maths@xn--prpacours-c4a.fr',
    subject: 'New Lead ✔',
    text: 'and easy to do anywhere, even with Node.js',
    html: output,
    };
    
    sgMail.send(msg).catch(err => console.log(err));

})






module.exports = router;