import styles from './styles.module.css'

export default function Profile(props) {
    return (
        <div className={styles.card}>
            <img src={props.avatar} className={styles.photo} alt="" />
            <h2>{props.name}</h2>
            <p style={{fontWeight:600, margin: "1rem"}}>{props.title}</p>
            <div>{props.bio}</div>
            <div>{props.phone}</div>
            <div>{props.email}</div>
            <div className={styles.links}>
                <a href={props.githubUrl} target="_blank">GitHub</a>
                <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
            </div>
        </div>
    )
}