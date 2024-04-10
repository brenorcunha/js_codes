import React, { useState, useEffect } from "react";
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

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState([]);
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
      if (tweet.id === tweetID && newTweets !== null) {
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
  const logout = () => {
    localStorage.removeItem("User"); //IF DON'T WORK, remove quotes.
    return axios
      .post(`${process.env.REACT_APP_SERVER_URL}/logout`)
      .then((response) => {
        return response.data;
      });
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
