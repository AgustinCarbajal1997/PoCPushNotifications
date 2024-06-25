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

  getFBConnection() {
    return this.firebaseAdmin;
  }
}

const FB = new FirebaseConfig();
module.exports = { FB };
