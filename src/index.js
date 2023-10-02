const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const app = express();

app.use(bodyParser.json());

const prepareAndStartServer = async () => {
  app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
};

prepareAndStartServer();
