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
                                <div className={styles.rolesSection}>
                                    {exp.roles.length > 1 ? (
                                        // Multiple roles → show progression bars
                                        <div className={styles.stepperWrapper}>
                                            {exp.roles.map((r, index) => {
                                                const isLatest = index === 0; // first role is latest in your config
                                                return (
                                                    <div key={r.role} className={styles.stepperItem}>
                                                        <div className={styles.stepperMarker}>
                                                            <span
                                                                className={
                                                                    isLatest
                                                                        ? styles.stepperDotFilled
                                                                        : styles.stepperDotHollow
                                                                }
                                                            ></span>
                                                        </div>
                                                        <div className={styles.roleInfo}>
                                                            <strong>{r.role}</strong>
                                                            <span className={styles.rolePeriod}>{r.from} - {r.to}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        // Only one role → clean minimal style
                                        <div className={styles.roleInfo}>
                                            <strong>{exp.roles[0].role}</strong>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.description}>
                                    {exp.description.split('\n').map((line, index) => (
                                        line.trim() !== '' ? <p key={index}>{line.trim()}</p> : <br key={index} />
                                    ))}
                                </div>
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