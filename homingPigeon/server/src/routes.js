function router2() {
  const validateToken = import("./auth.js");
  const User = import("./model/User.js");
  const Tweet = import("./model/Tweet.js");
  const express = require("express");
  const router = express.Router();

  router.get("/home", validateToken, async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const userExists = await User.findOne({ username });
      if (!userExists) {
        res.status(400);
        next({ error: "Homepage not found" });
      } else return navigate("/home");
    } catch (error) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });
  router.post("/register", validateToken, async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const userExists = await User.findOne({ username });

      if (userExists) {
        res.status(400);
        next({ error: "Username already in use." });
      } else {
        const salt = await require("bcryptjs").genSalt(10);
        const hash = await require("bcryptjs").hash(password, salt);
        const newUser = new User({
          username,
          password: hash
        });
		await newUser.save()
        res.status(201).json({
          id: user.id,
          username: user.username
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Couldnot create the user." });
    }
  });
  router.post("/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      let validPassword;
      const user = await User.findOne({ username });

      if (!user) return res.status(400).json({ error: "Invalid user." });
      else
        validPassword = await require("bcryptjs").compare(
          password,
          user.password
        );

      if (!validPassword)
        return res.status(400).json({ error: "Invalid password." });
      else {
        const token = require("jwt-decode").sign(
          { _id: user.id },
          process.env.JWT_SECRET
        );
        res.header("auth-token", token).json(token);
        res.status(200).json({ message: "User logged in." });
      }
    } catch (error) {
      res.status(500).json({ error: "Invalid credentials" });
    }
  });
  //======================USERS ROUTES
  router.get("/users", validateToken, async (req, res, next) => {
    const users = await User.find({});
    if (!users.length)
      return res.status(400).json({ error: "Unable to get users." });
    else {
      res.status(200).json(
        users.map((user) => ({
          _id: user.id,
          username: user.username,
        }))
      );
    }
  });

  router.get("/users/:id", validateToken, async (req, res, next) => {
    const { id } = req.params;

    try {
      const users = await User.findById(id).exec();
      if (users) {
        res.status(200).json(
          users.map((user) => ({
            _id: user.id,
            username: user.username,
          }))
        );
        res.render("Users list: ", { title: "Users list: ", users: users });
      }
    } catch (error) {
      res.status(404).json(new Error("User not found."));
      return next(error);
    }
  });

  router.delete("/users/:id", validateToken, async (req, res, next) => {
    const { id } = req.params;

    try {
      await User.deleteOne(id);
      res.status(200).json({ message: "User deleted." });
    } catch (error) {
      res.status(400);
      return next(error);
    }
  });
  //=============TWEETS ROUTES
  router.post("/tweets", validateToken, async (req, res, next) => {
    const { content } = req.body; //Requires the tweet content from the requisition.

    try {
      const tweet = await Tweet.create({ owner: req.user, content });
      if (!tweet) res.status(400).json({ error: "Unable to create tweet!" });
      res.status(201).json(tweet);
    } catch (error) {
      res.status(400);
      next(error);
    }
  });

  router.delete("/tweets/:id", validateToken, async (req, res, next) => {
    const { id } = req.params;

    try {
      await Tweet.deleteOne({ _id: id });
      res.status(200).json({ message: "Message deleted." });
    } catch (error) {
      res.status(400);
      next(error);
    }
  });

  router.put("/tweets/:id", validateToken, async (req, res, next) => {
    const { id } = req.params;

    try {
      const tweet = await Tweet.findById(id);
      if (!tweet) return res.status(400).json({ error: "Message not found." });
      if (tweet.owner === req.user._id) {
        res.status(400).json({ error: "Unable to update message." });
        const tweetAlreadyLiked = tweet.likes.some(
          (like) => like == req.user._id
        );

        if (tweetAlreadyLiked) {
          tweet.likes = tweet.likes.filter((like) => like != req.user._id);
        }
      } else {
        tweet.likes.push(req.user._id);
      }
      tweet.save();
      res.status(200).json(tweet);
    } catch (error) {
      const emptyArray = [];
      res.json(emptyArray);
    }
  });
  //Searching 4 all tweets
  router.get("/tweets", validateToken, async (req, res, next) => {
    try {
      const tweets = await Tweet.find({});
      res.status(200).json(tweets);
    } catch (error) {
      return [];
    }
  });

  router.get("/tweets/:id", validateToken, async (req, res, next) => {
    const { id } = req.params;

    try {
      const tweet = await Tweet.findById(id);
      if (!tweet) {
        res.status(400).json({ message: "Message not found." });
      }
      res.status(200).json(tweet);
    } catch (error) {
      res.status(400);
      next(error);
    }
  });

  router.post("/sessions", validateToken, async (req, res, next) => {});
}
