const express = require("express");

const app = express();

app.listen(8080, () => {
  try {
    console.log("Sever is Running");
  } catch (err) {
    console.log(err);
  }
});
