const express = require("express");
const path = require("path");
const db = require("./config/connection");
const models = require('./models/index');
const routes = require("./controllers");

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.use(routes);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  
  db.once("open", () => {
    app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
  });
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});