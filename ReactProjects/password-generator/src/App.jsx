import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Input from './Input';

function App() {
  const [count, setCount] = useState("")
  const [passwordSize, setPasswordSize] = useState(8)
  const [pwd, setPwd] = useState("")
  const [text, setText] = useState("Copy")
  const [showInput, setShowInput] = useState(false)

  function generate(e) {
    setText("Copy")
    /* const newPwd=Math.random().toString(36).substring(2, 2 + 8); Math.random() gera um 0 ou 1
      Converte o número decimal em uma string na base 36 (usando caracteres alfanuméricos de 0 a 9 e letras de ‘a’ a ‘z’).
      Pega os caracteres da string gerada, começando no índice 2 (ignorando os dois primeiros caracteres) e pegando os próximos 8 caracteres.  
    */
    try {
      const characters = "1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?"
      const length = passwordSize
      let newPwd = ""
      for (let i = 0; i < length; i++) {
        const position = Math.floor(Math.random()* characters.length)
        newPwd += characters[position]
      }
      setPwd(newPwd)
      setCount("Generated") 
    } catch (error) {
      setCount("Failed!")
    }
  }
  function copyToClipboard(e){
    setCount("Generate!")
    try {
      navigator.clipboard.writeText(pwd)
      setText("Copied!")
    } catch (error) {
      setText("Failed!")
    }
  }
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <h1>Password generator</h1>
      </a>
      <label htmlFor="showInput">Custom size </label>
      <input type="checkbox" id="field" value={showInput} onChange={() => setShowInput(currentState => !currentState)}/>
      <br />
      {showInput ? (
        <div>
        <label htmlFor="passwordSize">Size: </label>
        <Input type="number" passwordSize={passwordSize} setPasswordSize={setPasswordSize} />
        <button onClick={generate}>Generate password of {passwordSize} characters.</button>
      </div>
      ): <div>
          <button onClick={generate}>Generate password of 8 characters.</button>
        </div>
      }
      {/* Quando o 'showInput' é desmarcado, não volta o tamanho da senha para 8. Possivel solucao: 'showInput ? passwordSize : setPasswordSize(8)' */}
      <button onClick={copyToClipboard}>{text}</button>
      <br />
      <div>{pwd}</div>
    </div>
  )
}

export default App