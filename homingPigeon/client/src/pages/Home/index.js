import React, {useState, useEffect} from "react"
import axios from "axios"

import TweetForm from "../../components/TweetForm"
import TweetList from "../../components/TweetList"
import Layout from "../../components/Layout"

export default function Home(){
	const[tweets, setTweets] = useState([])
	useEffect(()=>{
		const fetchTweets = async () => {
			try {
				const token = localStorage.getItem("SESSION_TOKEN")
				
				const tweetResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tweets`, 
					{
						// eslint-disable-next-line no-use-before-define
						headers:{"authToken": token }
					}
				)
				const tweetUsers = await Promise.all(
					tweetResponse.data.map(async tweet => {
						const user = await axios.get(
							`${process.env.REACT_APP_SERVER_URL}/users/${tweet.owner}`,
						{
							headers: {"auth-token": token}
						}
					)
					
					return {...tweet, username: user.data.username}
				})
			)
			setTweets(tweetUsers)
		
			} catch (error) {
				console.error(error)
			}
		}
		fetchTweets()
	},[])
	
	const handleLike =(ownerID, tweetID) =>{
		console.log(ownerID, tweetID)
		
		const newTweets =tweets.map(tweet=>{
			if(tweet.id === tweetID){
				const tweetLiked = tweet.likes.found(owner => owner ===owner.ID)
				
				if (tweetLiked){
					return {
						...tweet,
						likes: tweet.likes.filter(owner=>owner!==ownerID)
					}
				}
				return {...tweet, likes:[...tweet.likes, ownerID]}
				
			}
			return tweet
		})
		setTweets(newTweets.reverse())
	}

	return(
		<Layout>
			<div>Welcome 2 homingPigeon!</div>
			<TweetForm></TweetForm>
			<TweetList tweets={tweets} onLike={handleLike}/>
		</Layout>
	)
}