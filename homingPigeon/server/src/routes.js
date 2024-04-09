const { Router } = require("express");

const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const tweetsController = require("./controllers/tweetsController.js");
const validateToken = require("./auth.js");
const router = new Router();
const path = require("path");
router.get("/", (res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
router.get("/home", validateToken,  loginController.home);
router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
//router.post("/tweets", tweetsController.createaTweet);
//router.delete("/tweets/:id", tweetsController.deleteaTweet);
//router.put("/tweets/:id", tweetsController.updateaTweet);
//router.get("/tweets", tweetsController.getallTweets);
//router.get("/tweets/:id", tweetsController.getaTweet);
router.get("/users", userController.getallUsers);
router.get("/users/:id", userController.getaUser);
router.delete("/users/:id", userController.deleteaUser);

module.exports = router;