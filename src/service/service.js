const { FB } = require("../config/config");

const sendPushNotificationService = async (title, body, data, token) => {
  try {
    await FB.sendPushNotification({
      token,
      notification: {
        title,
        body,
      },
      data,
    });
    return {
      statusCode: 200,
      status: "success",
    };
  } catch (error) {
    throw error;
  }
};

const sendMulticastPushNotificationService = async (
  title,
  body,
  data,
  tokens
) => {
  try {
    await FB.sendMulticastPushNotification({
      tokens,
      notification: {
        title,
        body,
      },
      data,
    });
    return {
      statusCode: 200,
      status: "success",
    };
  } catch (error) {
    throw error;
  }
};

const service = {
  sendPushNotificationService,
  sendMulticastPushNotificationService,
};
module.exports = service;
