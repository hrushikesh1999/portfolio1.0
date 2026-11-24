"use client";

import SectionHeading from "@/components/sectionHeading/SectionHeading";
import { useScroll } from "@/context/ScrollContext";
import ExperienceAlbum from "./ExperienceAlbum";
import experienceConfig from "./experienceConfig";
import styles from "./experience.module.css";

const Experience = () => {
    const { experienceRef } = useScroll();

    return (
        <div className={styles.section} ref={experienceRef}>
            <SectionHeading title="Experience" />
            <ExperienceAlbum pages={experienceConfig} />
        </div>
    );
};

export default Experience;
