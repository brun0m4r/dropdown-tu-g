const express = require("express");
const { conn } = require("./db");
const models = require("./routes/models");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.send({ message: "qonda" });
});

app.use("/empresas", models);

conn.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("listen in port", 3001);
  });
});
