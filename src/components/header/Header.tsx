"use client";
import SettingIcon from "@/assets/icons/SettingIcon"
import styles from "./header.module.css"
import Button from "../../ui/button/Button"
import { useLayout } from "@/context/LayoutContext"

const Header = () => {
    const { setisSidebarOpen } = useLayout()

    return (
        <div className={styles.header}>
            <Button onClick={() => setisSidebarOpen(true)}><SettingIcon /></Button>
        </div>
    )
}

export default Header