const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const Tweet = require("../model/Tweet");

exports.getallTweets = async (req, res) => {
  try {
    const owner = req.user;
    const tweets = await Tweet.find({ owner: owner }).exec();
    if (!tweets || tweets == null) {
      return res.status(500).json({ error: "Empty messages list." });
    } else {
      return res.status(200).json(tweets);
    }
  } catch (error) {
    res.status(400).json({ error: "Unable to get messages." });
  }
};

exports.createaTweet = async (req, res) => {
  const _content = req.body.content; //Requires the content of the message from the REQ.
  try {
    const tweet = await Tweet.create({
      owner: req.username,
      content: _content,
      likes: [],
    });
    if (!tweet || tweet == null) {
      return res
        .status(400)
        .json({ error: "Unable to create the message [EMPTY CONTENT]." });
    } else {
      /* tweet = new Tweet({
                owner: req.body.username,
                content: bcrypt.hashSync(req.body.password, 10),
              }); */
      await tweet.save();
      return res.status(200).json(tweet);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "[INTERNAL ERROR - 500] Unable to create the message." });
  }
};

exports.updateaTweet = async (req, res) => {
  try {
    const tweetId = req.body.tweetId;
    const tweets = await Tweet.findByIdAndUpdate({ _id: tweetId }, {content: req.body.content}, {new: true}).exec();
    //'new: true' retrieves the updated doc.
    if (!tweets || tweets == null) {
      return res.status(400).json({ error: "Message not found or empty." });
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

exports.deleteaTweet = async(req,res) => {
  try {
    const tweetId = req.body.tweetId;
    const tweets = await Tweet.findByIdAndDelete({ _id: tweetId }).exec();
    //'new: true' retrieves the updated doc.
    if (!tweets || tweets == null) {
      return res.status(400).json({ error: "Message not found or empty." });
    }
    return res.status(200).send({message: "Successfully deleted."})
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
