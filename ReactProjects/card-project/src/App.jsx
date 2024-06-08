import Card from './Components/Card'
import swposter from './assets/sw-poster'
import esbposter from './assets/esb-poster.jpg'
import rotjposter from './assets/rotj-poster.jpg'
function App() {
  return (
    <div>
      <Card title="Pôster: Star Wars (1977)" poster={swposter}/>
      <Card title="Pôster: Empire strikes back (1980)" poster={esbposter}/>
      <Card title="Pôster: The return of the JEDI (1983)" poster={rotjposter}/>
    </div>
  )
}

export default App
