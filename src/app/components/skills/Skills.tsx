"use client"
import { useScroll } from "@/context/ScrollContext";
import styles from "./skills.module.css"
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import skillList from "./skillList";
import SkillCard from "./SkillCard";

const Skills = () => {
    const { skillsRef } = useScroll();

    return (
        <div ref={skillsRef}>
            <SectionTitle title="Skills" />
            <div className={styles.skillgrid}>
                {skillList.map((item, i) => (
                    <SkillCard key={item.title} title={item.title} items={item.items} />
                ))}
            </div>
        </div>
    )
}

export default Skills