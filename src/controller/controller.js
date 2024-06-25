const service = require("../service/service");
const errorHandle = require("../utils/errorHandler");

const sendPushNotification = async (req, res) => {
  const { title, body, data, token } = req.body;

  try {
    const response = await service.sendPushNotificationService(
      title,
      body,
      data,
      token
    );
    return res.status(200).json(response);
  } catch (error) {
    errorHandle(res, error);
  }
};

const sendMulticastPushNotification = async (req, res) => {
  const { title, body, data, tokens } = req.body;

  try {
    const response = await service.sendMulticastPushNotificationService(
      title,
      body,
      data,
      tokens
    );
    return res.status(200).json(response);
  } catch (error) {
    errorHandle(res, error);
  }
};

//const sendToTopicPushNotification = async () => {
//  await firebaseAdmin.messaging().sendToTopic("mantenimiento", {
//    notification: {
//      title: "Alerta de mantenimiento 🚨",
//      body: "Entre las 11hs y 12hs vamos a estar realizando tareas de mantenimiento 🔧",
//    },
//    data: {
//      click_action: "ALERT_MODAL",
//      tab: "/home",
//    },
//  });
//};
//
const controller = {
  sendPushNotification,
  sendMulticastPushNotification,
  //sendToTopicPushNotification,
};
module.exports = controller;
