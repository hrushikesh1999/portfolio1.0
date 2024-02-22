import styles from "./sectionTitle.module.css"

type Props = {
    title: string
}

const SectionTitle = ({ title }: Props) => {
    return (
        <h3 className={styles.sectiontitle}>{title}</h3>
    )
}

export default SectionTitle