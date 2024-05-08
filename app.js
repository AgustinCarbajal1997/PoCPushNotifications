const express = require("express");
const controller = require("./controller");
const app = express();

app.use(express.json());

app.post("/sendPushNotification", async function (req, res) {
  const { title, body, email, data, imageUrl } = req.body;
  await controller.sendPushNotification(title, body, email, data, imageUrl);
  res.json({
    statusCode: 200,
    status: "success",
  });
});

app.post("/sendMulticastPushNotification", async function (req, res) {
  const { title, body, emails, data, imageUrl } = req.body;
  await controller.sendMulticastPushNotification(
    title,
    body,
    emails,
    data,
    imageUrl
  );
  res.json({
    statusCode: 200,
    status: "success",
  });
});

app.listen(3000, () => console.log("Servidor iniciado en puerto:" + 3000));
