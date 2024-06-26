import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"

import photo from './assets/IMG_0321.jpg'
import Profile from './Components/Profile'

function App() {
  return (
    <div>
        <Profile avatar={photo} name="Breno da Cunha" title="Full-stack DEV | Python | HTML | CSS | JS | React | Node" bio="Formado em Ciência da Computação pela Faculdade Anhanguera SJC. Busco oportunidade para iniciar minha carreira como desenvolvedor ou analista de testes, possuo sólidos conhecimentos com Python, incluindo Visão Computacional, Redes Neurais Artificiais, IA; também programação WEB JavaScript, entre outros." email="breno.rcunha@outlook.com" phone="(12) 99194-6531" githubUrl="https://github.com/brenorcunha" linkedinUrl="https://linkedin.com/in/brenodacunha" />
    </div>
  )
}

export default App
