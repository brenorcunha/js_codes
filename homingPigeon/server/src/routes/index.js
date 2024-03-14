const bcrypt = require('bcryptjs')
const jwtDecode = require('jwt-decode')
const validateToken = require('../auth')
const User = require('../model/User')
const Tweet = require('../model/Tweet')
const express = require('express')

const router = express.Router()
router.get('/', async (req, res) => {
  	res.sendFile(path.join(__dirname,'/index.html'))
})
router.get('/home', validateToken,async(req,res,next) =>{
	try {
		const {username, password} = req.body
		const userExists = await User.findOne({username})

	} catch (error) {
		res.send(201)
		send(error)
	}
	if(!userExists) res.status(400).send({error: 'Username not found'})

	next()
})
router.post('/register', validateToken, async (req,res,next) =>{
	try{
		const {username, password} = req.body
		const userExists = await User.findOne({username})
		
		if(userExists) return res.status(400).send({error: 'Username already in use.'})
		
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const user = await User.Create({
			username,
			password: hash
		})

		res.status(201).send({
			id: user.id,
			username: user.username
		})
		
	} catch(error){
		res.status(400)
		next(error)
	}
})
router.post('/login', async(req,res,next) =>{
	try {
		const {username, password} = req.body

		const user = await User.findOne({username})

		if(!user) return res.status(400).send({error: 'Username not found.'})

		const validPassword = await bcrypt.compare(password, user.password)
		if(!validPassword) return res.status(400).send({error: 'Invalid password.'})

		const token = jwtDecode.sign({_id: user.id}, process.env.JWT_SECRET)
		res.header('auth-token', token).send(token)
		res.send({message: 'User logged in.'})
	} catch (error) {
		res.status(400)
		send(error)
	}
})
//======================USERS ROUTES
router.get('/users', validateToken, async(req,res, next) =>{
	try {
		const users = await User.find({})
		if(!users.length) return res.status(400).send({error: 'Unable to get users.'})

		res.status(200).send(users.map(user => (
			{
				_id: user.id,
				username: user.username
			})
		))
	} catch{}
})

router.get('/users/:id', validateToken, async(req,res,next) =>{
    const {id} = req.params

    try {
        const users = await User.findById({id})
        if (!users) {
			res.status(400).send({message: 'User not found.'})
		}
		res.status(200).send(users.map(user => ({
			_id: user.id,
			username: user.username
		})
        ))
    } catch{}
})

router.delete('/users/:id', validateToken, async(req,res,next) =>{
    const {id} = req.params

    try {
        await User.deleteOne(id)
        res.status(200).send({message: 'User deleted.'})
    } catch (error) {
        res.status(400)
        return next(error)
    }
})
//=============TWEETS ROUTES
router.post('/tweets', validateToken, async(req,res,next)=>{
    const {content} = req.body //Requires the tweet content from the requisition.
    
    try {
        const tweet = await Tweet.create({owner: req.user, content})
        if(!tweet) res.status(400).send({error: 'Unable to create tweet!'})
        res.status(201).send(tweet)
    } catch (error) {
        res.status(400)
        send(error)
    }
})

router.delete('/tweets/:id', validateToken, async(req,res,next) =>{
    const {id} = req.params

    try {
        await Tweet.deleteOne(id)
        res.status(200).send({message: 'Message deleted.'})
    } catch (error) {
        res.status(400)
    	next(error)
    }
})

router.put('/tweets/:id', validateToken, async(req,res,next) =>{
    const {id} = req.params

	try {
		const tweet = await Tweet.findById(id)
		if(!tweet) return res.status(400).send({error: 'Message not found.'})
		if (tweet.owner===req.user._id) {
			res.status(400).send({error: 'Unable to update message.'})
			const tweetAlreadyLiked = tweet.likes.some(like => like==req.user._id)

            if(tweetAlreadyLiked){
                tweet.likes = tweet.likes.filter(like => like!=req.user._id)
            }
		} else {
			tweet.likes.push(req.user._id)
		}
		tweet.save()
		res.status(200).send(tweet)
	} catch (error) {
		res.status(400)
		next(error)
	}
})
//Searching 4 all tweets
router.get('/tweets', validateToken, async(req,res,next) =>{
	try {
		const tweets = await Tweet.find({})
		res.status(200).send(tweets)
	} catch (error) {
		res.status(400)
		next(error)
	}
})

router.get('/tweets/:id', validateToken, async(req,res,next) =>{
    const {id} = req.params

    try {
        const tweet = await Tweet.findById(id)
        if (!tweet) {
			res.status(400).send({message: 'Message not found.'})
		}
		res.status(200).send(tweet)
    } catch (error) {
        res.status(400)
        next(error)
    }
})

router.post('/sessions', validateToken, async(req, res, next) =>{})

module.exports = router