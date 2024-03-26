import React, {useState} from "react"
import Layout from "../../components/Layout"
import { Container, Content, Input, Button, ErrorWarning } from './styles'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

export default function Login(){
	const[username, setUsername] = useState("")
	const[password, setPassword] = useState("")
	const navigate = useNavigate()
	const[error, setError] = useState("")

	//async function handleLogin(event) {
	const handleLogin = async event =>{
		event.preventDefault()
		if (!username || !password) return
		else {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_SERVER_URL}/login`, {
					username,
					password
				})
				console.log(jwtDecode(response.data.token))
				localStorage.setItem("SESSION_TOKEN", response.data.token)
				return navigate("/home")
			} catch (error) {
				if(error.response.status===404) setError("User not found.")
				else if(error.response.status===4000) setError("Incorrect password.")
				setPassword("")
			}
		}
	}
	function handleRegister(event) {
		event.preventDefault()
		return navigate("/register")
	}
	return (
		<Layout>
			<Container>
				<Content>
					<p>Welcome 2 homingPigeon!</p>
					{error && <ErrorWarning>(error)</ErrorWarning>}
					<div>
						<label>Username: </label>
						<Input 
						value={username}
						onChange={e => setUsername(e.target.value)}
						type="text" 
						/>
					</div>
					<div>
						<label>Password: </label>
						<Input 
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password" 
						/>
					</div>
					
					<div>
						<Button onClick={handleRegister} type="submit">Register</Button>
						<Button onClick={handleLogin} type="submit">Enter</Button>
					</div>
				</Content>
			</Container>
		</Layout>
	)
}