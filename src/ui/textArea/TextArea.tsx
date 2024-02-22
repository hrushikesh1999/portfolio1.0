import { TextareaHTMLAttributes } from "react"
import styles from "./textArea.module.css"

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline',
    rows?: number,
    fullWidth?: boolean
}

const TextArea = ({ resize, rows = 1, fullWidth, ...rest }: Props) => {
    return (
        <textarea
            style={{
                resize,
                height: 40 * rows,
                width: fullWidth ? "100%" : "auto"
            }}
            className={styles.textarea}
            {...rest}
        />
    )
}

export default TextArea