import React, { useState } from "react";
import { Container } from "../TweetForm/styles";
import Tweet from "../Tweet";
import { ErrorWarning } from "../Register/styles";

export default function TweetList(props) {
  const [error, setError] = useState("");
  //console.log(props) PROPS: The elements our component receive. With it, we can reuse the components with different data.
  //In this case, the component receives a list of tweets.
  const token = localStorage.getItem("SESSION_TOKEN");

  if(Array.isArray(props.tweets)){
    return (
      <Container>
        {error && <ErrorWarning>(error)</ErrorWarning>}
        <ul>
          {props.tweets.map((tweet) => (
          <Tweet
            key={tweet._id}
            TweetId={tweet._id}
            owner={tweet.owner}
            username={tweet.username}
            content={tweet.content}
            likes={tweet.likes.length}
            onLike={props.onLike}
          />
          ))}
        </ul>
      </Container>
    );
  } else {
    setError("TweetList is empty...");
  }
};

// We've create an unordered list, then go throughout the array and using map, taking the element and its index, for rendering the list item.
//Key property is REQUIRED (obrigatória).
