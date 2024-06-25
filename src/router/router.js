const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();

router
  .post("/sendPushNotification", controller.sendPushNotification)
  .post(
    "/sendMulticastPushNotification",
    controller.sendMulticastPushNotification
  );

module.exports = router;
