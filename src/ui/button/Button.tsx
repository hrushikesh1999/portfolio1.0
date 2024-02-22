import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import styles from "./button.module.css"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren<{
    variant?: 'text' | 'outlined';
    active?: boolean;
    className?: string;
}>

const Button = (props: Props) => {
    const { children, variant = 'text', active, className, ...rest } = props
    const clsName = `${styles.btn} ${styles[`btn-${variant}`]} ${active ? styles[`btn-active`] : ''} ${className}`;

    return (
        <button className={clsName}  {...rest} >
            {children}
        </button>
    )
}

export default Button