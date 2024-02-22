"use client";
import CancelIcon from "@/assets/icons/CancelIcon"
import Button from "../../ui/button/Button"
import styles from "./sidebar.module.css"
import { useLayout } from "@/context/LayoutContext"
import { useScroll } from "@/context/ScrollContext";
import { CONTACT, EXPERIENCE, HOME, SKILLS } from "@/constant";
import { Section } from "@/types/section";
import HSvg from "../hSvg/HSvg";



const Sidebar = () => {
    const { isSidebarOpen, setisSidebarOpen } = useLayout()
    const { homeRef, experienceRef, skillsRef, contactRef, scrollToSection, activeSection } = useScroll();
    const sections: Array<Section> = [
        {
            id: HOME,
            name: 'Home',
            ref: homeRef
        },
        {
            id: EXPERIENCE,
            name: 'Experience',
            ref: experienceRef
        },
        {
            id: SKILLS,
            name: 'Skills',
            ref: skillsRef
        },
        {
            id: CONTACT,
            name: 'Contact',
            ref: contactRef
        },
    ]

    function handleSectionClick(section: Section) {
        scrollToSection(section.ref)
        setisSidebarOpen(false)
    }

    return (
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
            <div className={styles.sidebarcloseicon}>
                <Button onClick={() => setisSidebarOpen(false)}><CancelIcon /></Button>
            </div>
            <div className={styles.sidebarcontent}>
                <div style={{ width: "100%" }}>
                    <HSvg />
                    <ul className={styles.navList}>
                        {
                            sections.map(section => (
                                <li
                                    key={section.id}
                                    className={`${styles.navItem} ${activeSection === section.id ? styles['navitem-active'] : ""}`}
                                    onClick={() => handleSectionClick(section)}>
                                    <Button active={activeSection === section.id}>{section.name}</Button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.sidebarfooter}>
                <p className={styles.copyrightText}>© Copyright 2024 <br /> Hrushikesh Aavula</p>
            </div>
        </div>
    )
}

export default Sidebar