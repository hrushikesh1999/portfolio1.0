"use client";

import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { useScroll } from "@/context/ScrollContext";
import ExperienceAlbum from "./ExperienceAlbum";
import experienceConfig from "./experienceConfig";
import styles from "./experience.module.css";

const Experience = () => {
    const { experienceRef } = useScroll();

    return (
        <div className={styles.section} ref={experienceRef}>
            <div className={styles.sectionHeading}>
                <SectionTitle title="Experience" />
            </div>
            <ExperienceAlbum pages={experienceConfig} />
        </div>
    );
};

export default Experience;
