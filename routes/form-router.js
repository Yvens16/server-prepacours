const express = require('express');
const router = express.Router();
const {auth} = require('google-auth-library');
const nodemailer = require('nodemailer'); 

const keysEnv = process.env['CREDS'];
const keys = JSON.parse(keysEnv);
if (!keys){
    throw new Error('The $keys environment variable was not found!');
}


async function main() {
    // load the JWT or UserRefreshClient from the keys
   try { 
    const client = auth.fromJSON(keys);
    client.scopes = ['https://www.googleapis.com/auth/cloud-platform'];
    const url = `https://www.googleapis.com/dns/v1/projects/${keys.project_id}`;
    // const res = await client.request({url}); //J'ai une erreur à cette ligne
    } catch (err) {
        console.log(err);
    }
  }
  
  main().catch(console.error);

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
            type: 'OAuth2',
            user: 'yvensbelaston@gmail.com',
            serviceClient: keys.client_id,
            privateKey: keys.private_key,
            refreshToken: process.env.REFRESHTOKEN,
            accessToken: process.env.TOKEN
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