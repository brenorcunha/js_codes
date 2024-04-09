import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import { Container, Content, Input, Button, ErrorWarning } from "./styles";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleRegister(event) {
    event.preventDefault();
    if (!username || !password) return;
    else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/register`, {
          username,
          password,
        })
        .then((response) => {
          if(response.data.username){
            localStorage.setItem("User", JSON.stringify(response.data));
            console.log({ username, password });
            //navigate("/tweets"); SUGGESTION, CAN REMOVE IF IT DOESN'T MATTER.
          }
          return response.data;
        })
        .catch((error) => {
          setError("Something is wrong!");
          setPassword("");
        });
        const logout = () =>{
          localStorage.removeItem(user);
          return axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`)
          .then((response) => {
            return response.data;
          });
        };
        const getCurrentUser = () =>{
          return JSON.parse(localStorage.getItem("user"));
        };
    }
  }
  return (
    <Layout>
      <Container>
        <Content>
          {error && <ErrorWarning>(error)</ErrorWarning>}
          <div>
            <label>Username: </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>Password: </label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <div>
            <a href="/">Cancel </a>
            <Button type="submit" onClick={handleRegister}>
              Register
            </Button>
          </div>
        </Content>
      </Container>
    </Layout>
  );
}
