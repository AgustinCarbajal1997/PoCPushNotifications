const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccount.json");

class FirebaseConfig {
  firebaseAdmin;

  initFirebaseAdmin() {
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    return this.firebaseAdmin;
  }

  async sendPushNotification(notification) {
    try {
      await this.firebaseAdmin.messaging().send(notification);
    } catch (error) {
      throw error;
    }
  }

  async sendMulticastPushNotification(notification) {
    try {
      await this.firebaseAdmin.messaging().sendEachForMulticast(notification);
    } catch (error) {
      throw error;
    }
  }
}

const FB = new FirebaseConfig();
module.exports = { FB };
