import { InputHTMLAttributes } from "react";
import styles from "./textField.module.css"

type Props = InputHTMLAttributes<HTMLInputElement> & {
    fullWidth?: boolean
}

const TextField = ({ fullWidth, ...rest }: Props) => {
    return (
        <>
            <input
                style={{
                    width: fullWidth ? "100%" : "auto"
                }}
                className={styles.textfield}
                {...rest}
            />
        </>
    )
}

export default TextField