import styles from "./chip.module.css"

type Props = {
    name: string
}

const Chip = ({ name }: Props) => {
    return (
        <div className={styles.chip}>
            {name}
        </div>
    )
}

export default Chip