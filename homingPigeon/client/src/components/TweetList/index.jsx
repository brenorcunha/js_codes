import React, { useState, useEffect } from "react";
import { Container } from "../TweetForm/styles";
import Tweet from "../Tweet";
import axios from "axios";
//import { ErrorWarning } from "../Register/styles";
require("dotenv").config({path: './.env'});

export default function TweetList(props) {
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    // Busque os tweets quando o componente for montado
    const fetchTweets = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tweets`); // Rota para buscar tweets
        setTweets(response.data); // Atualize o estado com os tweets
      } catch (error) {
        console.error("Erro ao buscar tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <Container>
      <ul>
        {props.tweets.map((tweet) => (
          <Tweet key={tweet._id} owner={tweet.owner} content={tweet.content} likes={tweet.likes}/>
        ))}
      </ul>
    </Container>
  );
}
