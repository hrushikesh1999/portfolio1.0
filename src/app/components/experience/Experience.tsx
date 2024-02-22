"use client"
import { useScroll } from "@/context/ScrollContext";
import styles from "./experience.module.css"
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import experienceConfig from "./experienceConfig";
import Chip from "@/ui/chip/Chip";

const Experience = () => {
    const { experienceRef } = useScroll();

    return (
        <div ref={experienceRef}>
            <SectionTitle title="Experience" />
            <div className={styles.timeline}>
                {
                    experienceConfig.map(exp => (
                        <div key={exp.title} className={`${styles.container} ${styles.right}`}>
                            <div className={styles.content}>
                                <div className={styles.containerheader}>
                                    <h4>{exp.title}</h4>
                                    <h6>{exp.from} - {exp.to}</h6>
                                </div>
                                <p>{exp.description}</p>
                                <div className={styles.tags}>
                                    {exp.tags.map(tag => (
                                        <Chip key={tag} name={tag} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Experience