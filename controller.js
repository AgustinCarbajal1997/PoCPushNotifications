const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const sendPushNotification = async (title, body, email) => {
  const user = await getUser(email);
  await firebaseAdmin.messaging().send({
    token: user.fcmToken,
    notification: {
      title,
      body,
    },
    android: {
      notification: {
        notificationCount: 1,
        imageUrl:
          "https://documento.errepar.com/_next/image?url=https%3A%2F%2Fepcdn.errepar.com%2Fimagenes%2Factualidad%2F2024-03%2Fmi-estudio-modulo-ganancias.jpg&w=3840&q=75",
      },
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

const controller = {
  sendPushNotification,
  getUser,
};
module.exports = controller;
