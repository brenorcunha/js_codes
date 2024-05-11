import styles from './styles.module.css'
import Paragraph from '../Paragraph'

export default function Card(props){
 return(
    <div className={styles.container}>
        <img className={styles.poster} src={props.poster} alt={props.title} />
        <div>
            <h2>{props.title}</h2>
            {/* taking the title dinamically through the parameter inserted in Card component in App.jsx */}
            <Paragraph/>
            <button className={styles.button}>Comprar agora</button>
        </div>
    </div>
 )   
}