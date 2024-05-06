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
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAS3IHvVzVAjDca6w5_rDolrSIdtzCTz8Yb_A2f1NrNg&s",
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
