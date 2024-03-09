const { PrismaClient } = require("@prisma/client");
const express = require("express");
const nodemailer = require("nodemailer");
const zod = require("zod");
const resetRouter = express.Router();
const prisma = new PrismaClient();

function sendEmail({ email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Abishek PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Abishek</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing us. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Abishek</p>
    <hr style="border:none;border-top:1px solid #eee" />
    
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}
const emailcheck = zod.string().email();
resetRouter.get("/checks", async(req, res) => {
  const email = req.query.email;
  const success = emailcheck.safeParse(email);

    if(!success){
        return res.status(403).json({msg: "Invalid Inputs"})
    }

    try{
      const reslt = await prisma.user.findUnique({
        where: {
          email: email,
        }
      })
      if(!reslt){
        return res.status(403).json({msg: "email not found"})
      }
      return res.json({msg: "email found"})
    }
    catch(e){
      console.log(e);
      return res.status(403).json({error: "error mail"})
    }
});

resetRouter.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

module.exports = resetRouter;