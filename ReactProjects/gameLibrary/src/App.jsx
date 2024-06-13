import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  //Para que a aplicção leia do localStorage as imagens que já há ali, é necessário fazer a manipulação aqui no useState dos games,
  //pois, se for fazer uma alteração do setGame fora, cairá em LOOP infinito!
  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem("obc-game-lib")
    //Se a lista de jogos for vazia, retorna array vazio, pois senão retorna erro pois não acha nada!
    if(!storedGames) return []
    return JSON.parse(storedGames)
  })
  //setGame(JSON.parse(localStorage.getItem("obc-game-lib"))) ==> CAI EM LOOP INFINITO!!!
  const [title, setTitle] = useState("")
  const [cover, setCover] = useState("")

  const addGame = ({title, cover}) =>{
    const id = Math.floor(Math.random() * 1000000)
    const game = {id, title, cover}
    setGames(state => {
      const newState = [...state, game]
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))
      return newState
    })
  }
  const removeGame = (id) => {
    setGames(state => {
      // próx. linha: Pegar jogo tal que ID do jogo seja diferente di o ID atual
      const newState = state.filter(game => game.id !==id) 
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))
      return newState
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addGame({title, cover})
    setTitle("")
    setCover("")
  }

  return (
    <div className="app">
      <h1>Games Library</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="cover">Cover: </label>
          <input type="text" id="cover" value={cover} onChange={(e) => setCover(e.target.value)} />
        </div>
        <button>Add</button>
      </form>
      <div className="games">
        {games.map((game) => (
          <div key={game.id}>
            <img src={game.cover} alt="game cover" />
            <div>
              <p>{game.title}</p>
              <button onClick={() => removeGame(game.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
//https://i.pinimg.com/originals/ba/94/64/ba9464145eba8762f6286a3c8387c951.jpg
//https://moviesmedia.ign.com/movies/image/object/039/039813/star-wars-episode-vi-return-of-the-jedi_posters.jpg