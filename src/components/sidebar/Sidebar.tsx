"use client";
import CancelIcon from "@/assets/icons/CancelIcon"
import Button from "../../ui/button/Button"
import styles from "./sidebar.module.css"
import { useLayout } from "@/context/LayoutContext"
import { useScroll } from "@/context/ScrollContext";
import { CONTACT, EXPERIENCE, HOME, SKILLS } from "@/constant";
import { Section } from "@/types/section";
import HandwrittenLogo from "../handwrittenLogo/HandwrittenLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import buttonStyles from "@/ui/button/button.module.css";



const Sidebar = () => {
    const isHome = usePathname() === "/";
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
                    <HandwrittenLogo />
                    <ul className={styles.navList}>
                        {
                            sections.map(section => (
                                <li
                                    key={section.id}
                                    className={`${styles.navItem} ${isHome && activeSection === section.id ? styles['navitem-active'] : ""}`}>
                                    {isHome ? (
                                        <Button
                                            active={activeSection === section.id}
                                            aria-current={activeSection === section.id ? 'location' : undefined}
                                            onClick={() => handleSectionClick(section)}
                                        >
                                            {section.name}
                                        </Button>
                                    ) : (
                                        <Link href={`/#${section.id}`} className={`${buttonStyles.btn} ${buttonStyles["btn-text"]} ${styles.navLink}`} onClick={() => setisSidebarOpen(false)}>
                                            {section.name}
                                        </Link>
                                    )}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
