import { SkillListItem } from "@/types/skill"
import styles from "./skillCard.module.css"
import Image from "next/image"

type Props = SkillListItem

const SkillCard = ({ title, items }: Props) => {
    return (
        <div className={styles.skillcard}>
            <div className={styles.skillcardheader}>
                <h5>{title}</h5>
            </div>
            <ul>
                {items.map(item => (
                    <li key={item.name}>
                        <Image src={item.image} alt={item.alt} height={24} width={24} />
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SkillCard