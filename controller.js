const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const sendPushNotification = async (title, body, email, data, imageUrl) => {
  const user = await getUser(email);
  await firebaseAdmin.messaging().send({
    token: user.fcmToken,
    notification: {
      title,
      body,
    },
    data: {
      ...data,
    },
    android: {
      notification: {
        imageUrl,
      },
    },
  });
};

const sendMulticastPushNotification = async (
  title,
  body,
  emails,
  data,
  imageUrl
) => {
  const users = await getMultipleUsers(emails);
  const fcmTokens = users.map((user) => user.fcmToken);
  console.log(fcmTokens);

  await firebaseAdmin.messaging().sendEachForMulticast({
    tokens: fcmTokens,
    notification: {
      title,
      body,
    },
    data,
    android: {
      notification: {
        imageUrl,
      },
    },
  });

  await firebaseAdmin.messaging().sendToTopic("mantenimiento", {
    notification: {
      title: "Alerta de mantenimiento 🚨",
      body: "Entre las 11hs y 12hs vamos a estar realizando tareas de mantenimiento 🔧",
    },
    data: {
      click_action: "ALERT_MODAL",
      tab: "/home",
    },
  });
};

const sendToTopicPushNotification = async () => {
  await firebaseAdmin.messaging().sendToTopic("mantenimiento", {
    notification: {
      title: "Alerta de mantenimiento 🚨",
      body: "Entre las 11hs y 12hs vamos a estar realizando tareas de mantenimiento 🔧",
    },
    data: {
      click_action: "ALERT_MODAL",
      tab: "/home",
    },
  });
};

const getUser = async (email) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  let user = [];
  snapshot.forEach((doc) => user.push(doc.data()));
  return user[0];
};

const getMultipleUsers = async (emails) => {
  const snapshot = await db
    .collection("users")
    .where("email", "in", emails)
    .get();
  let users = [];
  snapshot.forEach((doc) => users.push(doc.data()));
  return users;
};

const controller = {
  sendPushNotification,
  sendMulticastPushNotification,
  sendToTopicPushNotification,
};
module.exports = controller;
