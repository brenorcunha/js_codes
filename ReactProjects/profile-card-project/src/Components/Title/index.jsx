import styles from "./styles.module.css"

export default function Title(props) {
  return <h3 className={styles.wrapper}>{props.text}</h3>
}