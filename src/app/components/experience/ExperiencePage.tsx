import { motion } from "motion/react";
import type { Variants } from "motion/react";
import Chip from "@/ui/chip/Chip";
import type { ExperienceEntry } from "./experienceConfig";
import styles from "./experiencePage.module.css";

type Props = {
    experience: ExperienceEntry;
    content: "rest" | "prepare" | "reveal";
    underlayDirection: number;
    turnDuration: number;
    tabIndex?: number;
};

const groupReveal = {
    rest: { opacity: 1, y: 0, transition: { duration: 0 } },
    prepare: { opacity: 0.75, y: 4, transition: { duration: 0 } },
    reveal: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.16, delay } }),
} satisfies Variants;

const clipFrames = [
    "inset(0 0 0 100%)",
    "inset(0 0 0 100%)",
    "inset(0 0 0 76%)",
    "inset(0 0 0 35%)",
    "inset(0 0 0 0%)",
    "inset(0 0 0 0%)",
];
const clipTimes = [0, 0.3, 0.4, 0.46, 0.5, 1];
const reverseClipFrames = [...clipFrames].reverse();
const reverseClipTimes = [...clipTimes].reverse().map(time => 1 - time);

const ExperiencePage = ({ experience, content, underlayDirection, turnDuration, tabIndex }: Props) => {
    const { title, from, to, roles, description, tags } = experience;
    const [primaryRole, ...previousRoles] = roles;
    const showCompanyDates = primaryRole && (primaryRole.from !== from || primaryRole.to !== to);
    const roleEnd = primaryRole?.to ?? to;
    const descriptionLines = description.trim().split("\n").map(line => line.trim());
    const summary = descriptionLines.filter(line => line && !line.startsWith("- "));
    const contributions = descriptionLines.filter(line => line.startsWith("- "));

    return (
        <motion.article
            className={styles.page}
            aria-label={title}
            tabIndex={tabIndex}
            initial={false}
            animate={{
                clipPath: underlayDirection === 0 ? "none" : underlayDirection < 0 ? reverseClipFrames : clipFrames,
            }}
            transition={underlayDirection === 0 ? { duration: 0 } : {
                duration: turnDuration,
                ease: "linear",
                times: underlayDirection < 0 ? reverseClipTimes : clipTimes,
            }}
        >
            <div className={styles.overview}>
                <motion.header className={styles.header} initial={false} animate={content} variants={groupReveal} custom={0}>
                    <div className={styles.company}>
                        <span>{title}</span>
                        {showCompanyDates && <span className={styles.period}>{from} – {to}</span>}
                    </div>
                    <div className={styles.currentRole}>
                        {primaryRole && <h4>{primaryRole.role}</h4>}
                        <p className={styles.period}>
                            {primaryRole?.from ?? from} – {roleEnd === "Present" ? <strong className={styles.present}>{roleEnd}</strong> : roleEnd}
                        </p>
                    </div>
                </motion.header>

                {previousRoles.length > 0 && (
                    <motion.ul className={styles.roles} aria-label="Previous roles" initial={false} animate={content} variants={groupReveal} custom={0.05}>
                        {previousRoles.map(role => (
                            <li key={role.role}>
                                <strong>{role.role}</strong>
                                <span className={styles.period}>{role.from} – {role.to}</span>
                            </li>
                        ))}
                    </motion.ul>
                )}
                {summary.length > 0 && (
                    <motion.div className={styles.summary} initial={false} animate={content} variants={groupReveal} custom={0.09}>
                        {summary.map(line => <p key={line}>{line}</p>)}
                    </motion.div>
                )}
            </div>

            {contributions.length > 0 && (
                <motion.div className={styles.impact} initial={false} animate={content} variants={groupReveal} custom={0.09}>
                    <h5 className={styles.label}>Key contributions</h5>
                    <ul className={styles.contributions}>
                        {contributions.map(line => <li key={line}>{line.slice(2)}</li>)}
                    </ul>
                </motion.div>
            )}

            <div className={styles.technologies}>
                <motion.h5 className={styles.label} initial={false} animate={content} variants={groupReveal} custom={0.16}>Technologies</motion.h5>
                <ul className={styles.tags} aria-label="Technologies">
                    {tags.map((tag, index) => (
                        <motion.li key={tag} initial={false} animate={content} variants={groupReveal} custom={0.17 + Math.min(index, 10) * 0.012}>
                            <Chip name={tag} />
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.article>
    );
};

export default ExperiencePage;
