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

const contributionIcons = [
    "m8 6-5 6 5 6m8-12 5 6-5 6m-3-14-2 16",
    "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
    "m13 2-8 12h6l-1 8 9-12h-6l1-8Z",
];

const ExperiencePage = ({ experience, content, underlayDirection, turnDuration, tabIndex }: Props) => {
    const { title, from, to, roles, description, tags } = experience;
    const [primaryRole] = roles;
    const hasRoleHistory = roles.length > 1;
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
            <motion.header className={styles.header} initial={false} animate={content} variants={groupReveal} custom={0}>
                <div className={styles.company}>
                    <span className={styles.iconTile} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21h18M5 21V3h10v18m0-13h4v13M8 7h4m-4 4h4m-4 4h4m-2 6v-3" />
                        </svg>
                    </span>
                    <span className={styles.companyName}>{title}</span>
                    <span className={styles.tenure}>{from} – {to}</span>
                </div>
            </motion.header>

            <div className={styles.overview}>
                <motion.div initial={false} animate={content} variants={groupReveal} custom={0}>
                    {primaryRole && <h3 className={styles.currentRole}>{primaryRole.role}</h3>}
                    {!hasRoleHistory && primaryRole && (primaryRole.from !== from || primaryRole.to !== to) && (
                        <p className={styles.period}>{primaryRole.from} – {primaryRole.to}</p>
                    )}
                </motion.div>

                {hasRoleHistory && (
                    <motion.ol className={styles.roles} role="list" aria-label="Career progression" initial={false} animate={content} variants={groupReveal} custom={0.05}>
                        {roles.map(role => (
                            <li key={role.role}>
                                <div className={styles.roleRow}>
                                    <strong>{role.role}</strong>
                                    <span className={styles.period}>{role.from} – {role.to}</span>
                                </div>
                            </li>
                        ))}
                    </motion.ol>
                )}
                {summary.length > 0 && (
                    <motion.div className={styles.summary} initial={false} animate={content} variants={groupReveal} custom={0.09}>
                        {summary.map(line => <p key={line}>{line}</p>)}
                    </motion.div>
                )}
            </div>

            {contributions.length > 0 && (
                <motion.div className={styles.impact} initial={false} animate={content} variants={groupReveal} custom={0.09}>
                    <h4 className={styles.label}>Key Contributions</h4>
                    <ul className={styles.contributions} role="list">
                        {contributions.map((line, index) => (
                            <li key={line}>
                                <span className={styles.iconTile} aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d={contributionIcons[index % contributionIcons.length]} />
                                    </svg>
                                </span>
                                <span>{line.slice(2)}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}

            <div className={styles.technologies}>
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
