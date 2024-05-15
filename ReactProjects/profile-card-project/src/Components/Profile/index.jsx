import Title from '../Title'
import ProfileSection from './ProfileSection'
import styles from './styles.module.css'

export default function Profile(props) {
    return (
        <div className={styles.card}>
            <img src={props.avatar} className={styles.photo} alt={props.name} />
            <h2>{props.name}</h2>
            
            <Title text={props.title} />
            <ProfileSection>{props.bio}</ProfileSection>
            <ProfileSection>{props.phone}</ProfileSection>
            <ProfileSection>{props.email}</ProfileSection>
            <ProfileSection />
            <div className={styles.links}>
                <a href={props.githubUrl} target="_blank">GitHub</a>
                <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
            </div>
        </div>
    )
}