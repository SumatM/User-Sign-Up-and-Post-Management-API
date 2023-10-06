const express = require("express");
const { mongoAtlasConnection } = require("./database/database");
const { apiRoute } = require("./route/api.route");

const app = express();

app.get('/',(req,res)=>{
  try{
    res.status(200).json({message:" User Sign-Up and Post Management API"})
  }catch(err){
    res.status(400).json({error:err})
  }
})

app.use(express.json());

app.use("/api", apiRoute);

app.listen(8080, async () => {
  try {
    console.log("Sever is Running");
    mongoAtlasConnection.then((res) => {
      console.log("MongoAtlas is Connected");
    });
  } catch (err) {
    console.log(err);
  }
});
