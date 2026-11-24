"use client";

import { motion, type Variants } from "motion/react";
import styles from "./sectionHeading.module.css";

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

const dividerVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.4, delay: 0.06, ease: "easeOut" } },
};

export default function SectionHeading({ title }: { title: string }) {
    return (
        <motion.h2
            className={styles.heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.span className={styles.title} variants={titleVariants}>{title}</motion.span>
            <motion.span className={styles.divider} variants={dividerVariants} aria-hidden="true" />
        </motion.h2>
    );
}
