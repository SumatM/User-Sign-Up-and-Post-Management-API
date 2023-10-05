const express = require("express");
const { mongoAtlasConnection } = require("./database/database");

const app = express();

app.use(express.json())

app.listen(8080, async() => {
  try {
    console.log("Sever is Running");
    mongoAtlasConnection.then((res) => {
      console.log("MongoAtlas is Connected");
    });
  } catch (err) {
    console.log(err);
  }
});
