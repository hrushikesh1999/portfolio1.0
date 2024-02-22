import Button from "@/ui/button/Button"
import styles from "./accountLinks.module.css"
import GithubIcon from "@/assets/icons/GithubIcon"
import LinkedinIcon from "@/assets/icons/LinkedinIcon"
import EmailIcon from "@/assets/icons/EmailIcon"

type Props = {
    size?: "sm" | "md";
}

const AccountLinks = ({ size = "md" }: Props) => {
    const width = size === "md" ? "25" : "15"
    const height = size === "md" ? "25" : "15"
    const accounts = [
        {
            url: "https://github.com/hrushikesh1999",
            label: "Github Account",
            icon: <GithubIcon width={width} height={height} />,
        },
        {
            url: "https://www.linkedin.com/in/hrushikesh-aavula-6629b419b/",
            label: "LinkedIn Account",
            icon: <LinkedinIcon width={width} height={height} />,
        },
        {
            url: "mailto:hrushikesh007007@gmail.com",
            label: "Mail hrushikesh",
            icon: <EmailIcon width={width} height={height} />,
        },
    ]
    return (
        <div className={styles.acntlinks}>
            {
                accounts.map(a => (
                    <a key={a.label} href={a.url} target="_blank" aria-label={a.label}>
                        <Button>
                            {a.icon}
                        </Button>
                    </a>
                ))
            }
        </div>
    )
}

export default AccountLinks