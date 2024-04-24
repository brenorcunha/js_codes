import React, {useState} from "react"
import {Container, Button} from "./styles"
import axios from "axios"

export default function TweetForm() {
    const[text, setText] = useState([])

    async function handleTweet(event) {
        event.preventDefault()

        try {
            const token = localStorage.getItem("SESSION_TOKEN")
            
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/tweets`,
                {
                    content: text
                },
                {
                    headers: { "auth-token": token }
                }
            )
            setText("")
            console.log(response)
        }
        catch (error) {
            console.error(error)
        }
    }
    return(
        <Container>
            <div>
                <textarea 
                required
                value = {text}
                onChange={event => setText(event.target.value)}
                placeholder="What do you want to share with us?"
                rows={4}
                />
                <br/>
                <Button onClick={handleTweet}>Share</Button>
            </div>
        </Container>
    )
}