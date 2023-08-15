const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

let app = express();

const iden = { username: "GoodPeople", playcount: 1 };

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thanhnhanle1407@gmail.com",
    pass: "atfvslwladjzywfo",
  },
});

var mailOptions = (list) => {
  return {
    from: "thanhnhanle1407@gmail.com",
    to: "thanhnhanle1407@gmail.com",
    subject: "Happy birthday!",
    text: `Dear Người tốt!
    Chúc mừng người tốt đã giành được những phần quà rất giá trị từ chương trình bao gồm ${list.toString()}`,
  };
};

app.post("/mark", (req, res) => {
  iden.playcount -= 1;
  transporter.sendMail(mailOptions(req.body.data), function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send({ result: "success" });
});

app.get("/check", (req, res) => {
  if (iden.playcount == 1) {
    res.send({ result: "success" });
  } else {
    res.send({ result: "fail" });
  }
});

let port = 3001;
app.listen(port, () => {
  console.log("Server running on ", port);
});
