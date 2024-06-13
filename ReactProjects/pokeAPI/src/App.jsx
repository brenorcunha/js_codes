import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  const data = await response.json()
  return data.results
}
function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonShown, setPokemonShown] = useState(null)
  /* Modo padrão: Cai em um LOOP infinito!
  fetchPokemon.then((result) => {
    console.log("Request done.")
    console.log(result)
    setPokemon(result)
    Na DIV classname:
    {JSON.stringify(pokemon)}
  }) */
  if(pokemon.length === 0){
    fetchPokemon().then(results => {
      console.log("Request done.")
      console.log(results)
      setPokemon(results)
    })
  }
  /* 
  ERRO 2: criar estados para obter os pokemons e criar outro useEffect para verificar se este não for nulo: 
  Cai em renderizacoes desnecessárias!!!
  const [url,setUrl] = useSatet(null)
  useEffect(() => {
    if (url) {
      fetch(url).then(res => res.json()).then(data => {
        console.log("pokemon encontrado")
        console.log(data)
        setPokemonShown(data)
      })
    }
  }, [url]) 
  Correção abaixo:*/
  const showDetails = async (url) => {
    const data = await fetch(url).then(res => res.json())
    console.log(data)
    setPokemonShown(data)
  }

  return (
    <div className='app'>
      <div>
        <h2>Pokémon</h2>
        <ul className="pokemon">
          {pokemon.map(mon => (
            <li key={mon.name}>
              <span>{mon.name}</span>
              <button onClick={() => showDetails(mon.url)}> See more details</button>
            </li>
          ))}
        </ul>
      </div>
      {pokemonShown && (
        <div>
          <h2>{pokemonShown.name}</h2>
          <img
            src={pokemonShown.sprites.front_default}
            alt=""
          />
          <div className="stat">
            <b>Tipo: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>{pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>{pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul>
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul>
              {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
