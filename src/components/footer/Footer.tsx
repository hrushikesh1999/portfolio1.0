import AccountLinks from "../accountLinks/AccountLinks"
import styles from "./footer.module.css"

const Footer = () => {
    return (
        <div className={styles.footer}>
            <AccountLinks size="sm" />
        </div>
    )
}

export default Footer