import styles from "./hSvg.module.css"

const HSvg = () => {

    return (
        <div className={styles.hsvgcontainer}>
            <div className={styles.avatarbg}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={styles.svgitem}>
                    <path d="M15 -15 l 0 110 z" className={styles.svgpath} />
                    <path d="M75 0 l 0 110 z" className={styles.svgpath} />
                    <path d="M0 50 h 0 100 z" className={styles.svgpath} />
                </svg>
            </div>
        </div>
    )
}

export default HSvg