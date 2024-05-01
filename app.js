const express = require("express");
const controller = require("./controller");
const app = express();

app.use(express.json());

app.post("/sendPushNotification", async function (req, res) {
  const { title, body, email } = req.body;
  await controller.sendPushNotification(title, body, email);
  res.json({
    statusCode: 200,
    status: "success",
  });
});

app.post("/getUser", async function (req, res) {
  const user = await controller.getUser(req.body.email);
  res.json({
    statusCode: 200,
    status: "success",
    data: user,
  });
});

app.listen(3000, () => console.log("Servidor iniciado en puerto:" + 3000));
