import React from "react"
import {Container} from "../TweetForm/styles"
import Tweet from "../Tweet"

export default function TweetList(props) {
    
    //console.log(props) PROPS: The elements our component receive. With it, we can reuse the components with different data.
    //In this case, the component receives a list of tweets. 
    return(
        <Container>
            <ul>
                {props.tweets.map(tweet => (
                    <Tweet
                    key={tweet._id}
				    TweetId={tweet._id}
                    owner = {tweet.owner}
				    username =
                    {tweet.username}
                    content = {tweet.content}
                    likes = {tweet.likes.length}
				    onLike = {props.onLike}
                    />
                ))}
            </ul>
        </Container>
    )
}

// We've create an unordered list, then go throughout the array and using map, taking the element and its index, for rendering the list item.
//Key property is REQUIRED (obrigatória). 