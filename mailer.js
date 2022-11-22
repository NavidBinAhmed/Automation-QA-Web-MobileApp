const nodemailer = require('nodemailer');

//Step 1
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ntuc.qateam@gmail.com',
    pass: 'Great2022!!!'
  }
});

//Step 2
let mailOptions = {
  //, salvador.ballesteros@nfcguest.com, stuart.ho@ntucfirstcampus.com, shalini.olivera@nfcguest.com, nikolai.reyes@nfcguest.com, van.huynh@nfcguest.com
  from: 'ntuc.qateam@gmail.com',
  to: "jamil.bautista@nfcguest.com",
  subject: 'Automated Test Results',
  text: 'Test 123',
  attachments: [
    {
      //filename: 'master-report.html',
      filename: 'master-report.pdf',
      path: './Reports/master-report.pdf',
    }
  ]
};

//Step 3
transporter.sendMail(mailOptions, function(err, data){
  if (err) {
    console.log('Unable to send email report', err);
  } else {
    console.log('Email Report Sent!')
  }
});