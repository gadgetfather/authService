const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const app = express();

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
    if (process.env.DB_SYNC) {
      console.log("Syncing DB");
      const { sequelize } = require("./models");
      sequelize.sync({ alter: true });
    }
  });
};

prepareAndStartServer();
