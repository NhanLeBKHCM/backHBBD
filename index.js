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
  host: "stmp.gmail.com",
  port: 587,
  auth: {
    user: "thanhnhanle1407@gmail.com",
    pass: "atfvslwladjzywfo",
  },
});

var mailOptions = (list, email) => {
  return {
    from: "thanhnhanle1407@gmail.com",
    to: email,
    subject: "Happy birthday!",
    text: `
    Dear Người tốt!
    Lời nói đầu tiên xin chúc bạn có một ngày sinh nhật vui vẻ. Chúc mừng bạn đã giành được những phần quà rất giá trị từ chương trình bao gồm [${list
      .toString()
      .replaceAll(",", ", ")}]
    Để nhận thưởng, bạn vui lòng liên hệ chị Nguyễn Mai Thủy Ngân.
    Thân
    Từ một người tốt khác`,
  };
};

app.post("/complete", async (req, res) => {
  console.log(req.body.email);
  iden.playcount -= 1;
  res.send({ result: "success" });
  await new Promise(async (resolve, reject) => {
    return transporter.sendMail(
      mailOptions(req.body.data, req.body.email ?? ""),
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  });
});

app.get("/play", (req, res) => {
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
