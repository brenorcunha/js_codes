import Tweet from './Tweet';
import User from './User';

const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const TweetComment = new mongoose.Schema({
tweetId:{
	type: String,
	required: true
},
ownerId:{
	type: String,
	ref: 'User',
},
content:{
	type: String,
	required: true,
	min: 1
},
createdAt:{
	type: Date,
	required: true
},
updatedAt:{
	type: Date
},
likes: [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User'
}]}, {
	timestamps: true
})

/*  @Entity('tweet_comment')
class TweetComment {
@PrimaryGeneratedColumn('uuid')
id: String;

@Column()
tweetId: string;

@Column()
ownerId: string;

@Column()
content: string;

@CreateDateColumn({ name: 'created_at' })
createdAt: Date;

@UpdateDateColumn({ name: 'updated_at' })
updatedAt: Date;

@ManyToOne(type => Tweet, tweet => tweet.comments)
@JoinColumn({ name: 'tweetId' })
tweet: Tweet;

@ManyToOne(type => User, user => user.comments)
@JoinColumn({ name: 'ownerId' })
owner: User;
} */

module.exports = mongoose.model("TweetComment", TweetComment);