const express = require("express");
const router = require("./src/router/router");
const { FB } = require("./src/config/config");

const app = express();
FB.initFirebaseAdmin();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/notifications", router);

const PORT = 3000;
app.listen(PORT, () => console.log("Servidor iniciado en puerto:" + PORT));
