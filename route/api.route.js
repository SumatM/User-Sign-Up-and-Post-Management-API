const express = require("express");
const { userModel } = require("../model/user.model");
const { postModel } = require("../model/post.model");

const apiRoute = express.Router();

// signup route
apiRoute.post("/signup", (req, res) => {
  try {
    const { email, name } = req.body;
    let user = userModel.findOne({ email });
    if (!user) {
      let newuser = new userModel(req.body);
      user.save();

      res.status(200).json({ message: "Successful user sign-up." });
    } else {
      res.status(400).json({ error: "User exist" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// post route
apiRoute.post("/posts", async (req, res) => {
  try {
    const { userId, content } = req.body;
    const user = await userModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const post = { userId, content };
    let newPost = new postModel(post);
    newPost.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// delete route
apiRoute.delete("/deletepost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    await postModel.findByIdAndDelete({ _id: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// get post route
apiRoute.get("/posts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const posts = await postModel.find({ userId });

    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = { apiRoute };
