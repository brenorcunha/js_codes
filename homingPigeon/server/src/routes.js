const express = require("express");
const app = express();
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const tweetsController = require("./controllers/tweetsController.js");
const validateToken = require("./auth.js");
const router = express.Router();
const path = require("path");
const cookieSession = require("cookie-session");

app.use(router);
router.use(cookieSession({
    name: "brenorc-session",
    keys: [process.env.JWT_SECRET],
    httpOnly: true
  }));
router.get("/home", validateToken,  loginController.home);
router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/logout", validateToken, loginController.logout);
router.post("/tweets", tweetsController.createaTweet);
router.delete("/tweets/:id", tweetsController.deleteaTweet);
router.put("/tweets/:id", tweetsController.updateaTweet);
router.get("/tweets", tweetsController.getallTweets);
router.get("/users", validateToken, userController.getallUsers);
router.get("/users/${id}", validateToken, userController.getaUser);
router.delete("/users/:id", validateToken, userController.deleteaUser);

module.exports = router;