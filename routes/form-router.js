const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer'); 

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/form', (req, res, next) => {
    console.log(req.body, 'req.body');
    let output = `
    <h1>We have a new lead</h1>
    <ul>
        <li>Nom: ${req.body.name} </li>
        <li>Prénom: ${req.body.firstName} </li>
        <li>numéro de téléphone: ${req.body.phone} </li>
        <li>Difficulté dans quels matière: ${req.body.diff}</li>
        <li>Comment l'aider vous? : ${req.body.help}</li>
        <li>À rappeller le: ${req.body.date}</li>
    </ul>`;

    let msg = {
    to: process.env.MAIL2,
    from: process.env.MAIL2,
    subject: 'New Lead ✔',
    text: 'and easy to do anywhere, even with Node.js',
    html: output,
    };
    
    sgMail.send(msg).catch(err => console.log(err));
})

router.post('/formulaire', (req, res, next) => {
    console.log(req.body, 'req.body');
     let output = `
    <h1>We have a new lead</h1>
    <ul>
        <li>Nom: ${req.body.name} </li>
        <li>Prénom: ${req.body.firstName} </li>
        <li>numéro de téléphone: ${req.body.phone} </li>
        <li>Les 3 dernières notes ne maths: ${req.body.note1}, ${req.body.note2}, ${req.body.note3}</li>
        <li>Comment l'aider vous? : ${req.body.description}</li>
        <li>À rappeller le: ${req.body.date}</li>
    </ul>`;

    let msg = {
    to: process.env.MAIL2,
    from: process.env.MAIL2,
    subject: 'New Lead ✔',
    text: 'and easy to do anywhere, even with Node.js',
    html: output,
    };
    
    sgMail.send(msg).catch(err => console.log(err));
})






module.exports = router;