const express = require("express");
const { userModel } = require("../model/user.model");
const { postModel } = require("../model/post.model");
const bcrypt = require("bcrypt");
const apiRoute = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { authenticateUser } = require("../middleware/authentication.middleware");

// signup route
apiRoute.post("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 3);
      let newuser = new userModel({ ...req.body, password: hashedPassword });
      newuser.save();
      res
        .status(200)
        .json({ message: "Successful user sign-up.", user: newuser });
    } else {
      res.status(400).json({ error: "User exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

// login
apiRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

apiRoute.use(authenticateUser);

// post route
apiRoute.post("/posts", async (req, res) => {
  try {
    const { userId, content } = req.body;
    const user = await userModel.findById(userId);
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
    const userId = req.body.userId;
    const post = await postModel.findOne({ _id: postId, userId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await postModel.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// get post route
apiRoute.get("/posts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    const posts = await postModel.find({ userId });

    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = { apiRoute };
