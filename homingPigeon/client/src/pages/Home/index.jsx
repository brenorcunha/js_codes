import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TweetForm from "../../components/TweetForm";
import TweetList from "../../components/TweetList";
import Layout from "../../components/Layout";
import {
  Container,
  Content,
  Button,
  ErrorWarning,
} from "../../components/Register/styles";
require("dotenv").config({path: './.env'});

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const token = localStorage.getItem("SESSION_TOKEN");

        const tweetResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/tweets`,
          {
            headers: { authToken: token },
          }
        );
        if (Array.isArray(tweetResponse.data)) {
          const tweetUsers = await Promise.all(
            tweetResponse.data.map(async (tweet) => {
              const user = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/users/${tweet.owner.id}`,
                {
                  headers: { "auth-token": token },
                }
              );

              return { ...tweet, username: user.data.username };
            })
          );
          setTweets(tweetUsers.reverse()); //Reverse the orders of the messages.
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchTweets();
  }, []);

  const handleLike = (ownerID, tweetID) => {
    //console.log(ownerID, tweetID);
    const newTweets = tweets.map((tweet) => {
      if (tweet.id === tweetID) {
        const tweetLiked = tweet.likes.found((owner) => owner === owner.ID);

        if (tweetLiked) {
          return {
            ...tweet,
            likes: tweet.likes.filter((owner) => owner !== ownerID),
          };
        } else {
          return { ...tweet, likes: [...tweet.likes, ownerID] };
        }
      }
      return tweet;
    });
    setTweets(newTweets.reverse());
  };
  const logout = async () => {
    try {
      localStorage.removeItem("User");
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`);
      
      return navigate("/login");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Layout>
      <Container>
        <Content>
          {error && <ErrorWarning>(error)</ErrorWarning>}
          <div>Welcome 2 homingPigeon!</div>
          <TweetForm>
            <TweetList tweets={tweets} onLike={handleLike} />
          </TweetForm>
          <div>
            <Button type="submit" onClick={logout}>
              Logout
            </Button>
          </div>
        </Content>
      </Container>
    </Layout>
  );
}
