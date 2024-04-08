/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import {Container, LikeButton} from "./styles"
import axios from "axios"
let token = req.headers["authorization"]; 
TypeError: Cannot read properties of undefined (reading 'x-access-token')
    at validateToken (C:\Users\breno\js_codes\homingPigeon\server\src\auth.js:5:26)
    at Object.<anonymous> (C:\Users\breno\js_codes\homingPigeon\server\src\index.js:15:21)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32) 
    at Module._load (node:internal/modules/cjs/loader:1013:12)    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
    at node:internal/main/run_main_module:28:49
export default function Tweet(props) {
    const[username, setUsername] = useState("")
    useEffect(() => {
        const fetchUsername = async () =>{
            try {
                const token = localStorage.getItem("SESSION_TOKEN")

                const response=await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/users/${props.owner}`,
                    {
                        headers: {"auth-token": token}
                    }
                )
                // eslint-disable-next-line react-hooks/exhaustive-deps, no-const-assign
                setUsername = (response.data.username)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUsername()
    })
    return(
        <Container>
            <span>{username}</span>
            <span>{props.owner}</span>
            <p>{props.content}</p>
            <div>
                <span>{props.likes.length}</span>
                <LikeButton>Like</LikeButton>
            </div>
        </Container>
    )
}