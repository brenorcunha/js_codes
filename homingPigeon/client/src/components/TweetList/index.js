import React, { useState, useEffect } from "react";
//import { Container } from "../TweetForm/styles";
import Tweet from "../Tweet";
//import { ErrorWarning } from "../Register/styles";
import axios from "axios";

export default function TweetList() {
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    // Busque os tweets quando o componente for montado
    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://localhost:3333/tweets"); // Rota para buscar tweets
        setTweets(response.data); // Atualize o estado com os tweets
      } catch (error) {
        console.error("Erro ao buscar tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h2>Tweets</h2>
      <ul>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
}
