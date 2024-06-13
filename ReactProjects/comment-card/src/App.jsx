import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
function App() {
  const handleClick = (e) => {
    e.preventDefault()
    //Para gerar ID's para cada comentário: 
    const newComment = {
      id: Math.floor(Math.random() * 1000000),
      author: email,
      createdAt: new Date(), //incluindo data atual
      content: content
    }
    setComment((state) => [newComment, ...state]) //Adicionar o novo aos já existentes na lista.
    setContent("")
    setEmail("")
  }
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState([]) //Array vazio para armazenar os comentários de forma permanente.
  const [content, setContent] = useState("")
  return (
    <div className="body">
      <h2>Comments section: </h2>
      <div>
        <label htmlFor="email">Email: </label> <br />
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div>
        <label htmlFor="comment">Comment: </label> <br />
        <textarea id="textArea1" rows="6" cols="30" placeholder='Type your comment here.' value={content} required  onChange={(e) => setContent(e.target.value)} ></textarea>
      </div>
      <button type="submit" onClick={handleClick}>Send comment</button>
      <br />
      <hr />
      <div className="area">
        {/* Se há comentários, renderizará a lista: */}
        {comment.length >0 ? (
          comment.map((comment) => (
            <div key={comment.id}>
              <h3>{comment.author}</h3>
              {/* Pegar a data de criação do comentário como String: */}
              <span>Created at {comment.createdAt.toLocaleString()}</span>
              <p>{comment.content}</p>
            </div>
          ))
        ): ( <p>Be the first to comment!</p>)}
      </div>
    </div>
  )
}

export default App
