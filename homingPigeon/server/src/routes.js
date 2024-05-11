const express = require("express");
const app = express();
const loginController = require("./controllers/loginController");
const userController = require("./controllers/userController");
const tweetsController = require("./controllers/tweetsController.js");
const validateToken = require("./auth.js");
const router = express.Router();
const cookieSession = require("cookie-session");

app.use(router);
router.use(cookieSession({
    name: "brenorc-session",
    keys: [process.env.JWT_SECRET],
    httpOnly: true
  }));

router.get("/", [validateToken], loginController.blank);
router.get("/home", [validateToken], loginController.home);
router.post("/register", loginController.register);
router.post("/login", loginController.login);
router.post("/logout", [validateToken], loginController.logout);
router.post("/tweets", [validateToken],tweetsController.createaTweet);
router.get("/tweets/:id", [validateToken], tweetsController.getaTweet);
router.delete("/tweets/:id", [validateToken],tweetsController.deleteaTweet);
router.put("/tweets/:id", [validateToken],tweetsController.updateaTweet);
router.get("/tweets", [validateToken],tweetsController.getallTweets);
router.get("/users", [validateToken], userController.getallUsers);
router.get("/users/:id", [validateToken], userController.getaUser);
router.delete("/users/:id", [validateToken], userController.deleteaUser);
//EX: http://localhost:3333/tweets/6628031a1a7c327a55a98702
module.exports = router;