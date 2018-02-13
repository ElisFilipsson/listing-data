import express from "express";
import bodyParser from "body-parser";
import { APP_PORT, APP_HOST, APP_PROTOCOL, FRONTEND_URL } from "./config";
import { generateData } from "./utils/generate-data";
const homeRoutes = require("./routes/homes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import models to create tables with sequelize
const models = require("./models");
models.sequelize.sync({ force: false, logging: false }).then(() => {
  if (process.env.GENERATE_DUMMYDATA === "true") generateData();
});

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:7777/",
    FRONTEND_URL,
    process.env.FRONTEND_URL
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, content-type, Accept"
  );
  next();
});

const server = app.listen(APP_PORT, APP_HOST, () => {
  if (process.env.NODE_ENV === "development") {
    const chalk = require("chalk");
    console.log(
      chalk`{bgCyan.black.bold Houses is running in ${
        process.env.NODE_ENV
      } at ${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}}`
    );
  } else {
    console.log(
      `Houses is running in ${
        process.env.NODE_ENV
      } at ${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`
    );
  }
});

export default server;

async function health(req, res) {
  res.status(200).json(200);
}

app.get("/", health);
app.use("/homes", homeRoutes);
