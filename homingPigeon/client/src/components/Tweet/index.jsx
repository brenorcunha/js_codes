import React, { useState, useEffect } from "react";
import { Container, LikeButton } from "./styles";
import axios from "axios";
require("dotenv").config({path: './.env'});

//PROPS: Properties that the component receives, like the list of all the tweets. 
export default function Tweet() {
  let [username, setUsername] = useState([])
  const [error, setError] = useState();
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("SESSION_TOKEN");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${tweets.owner.id}}`,
          {
            headers: { "auth-token": token },
          }
        );
        setUsername = response.data.username;
      } catch (error) {
        setError(error);
      }
    };
    fetchUsername();
  });
  return (
    <Container>
      <span>{tweets.owner}</span>

      <p>{tweets.content}</p>

      <div>
       {/* <span>{props.likes.length}</span> */}

        <LikeButton>Like</LikeButton>
      </div>
    </Container>
  );
}
