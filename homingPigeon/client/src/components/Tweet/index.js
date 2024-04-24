/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, LikeButton } from "./styles";
import axios from "axios";
//let token = req.session.token;

export default function Tweet(props) {
  const [username, setUsername] = useState([])
  const [error, setError] = useState([]);
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("SESSION_TOKEN");

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${props.owner}`,
          {
            headers: { "auth-token": token },
          }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps, no-const-assign
        setUsername = response.data.username;
      } catch (error) {
        setError(error);
      }
    };
    fetchUsername();
  });
  return (
    <Container>
      <span>{username}</span>
      <span>{props.owner}</span>
      <p>{props.content}</p>
      <div>
        <span>{props.likes.length}</span>
        <LikeButton>Like</LikeButton>
      </div>
    </Container>
  );
}
