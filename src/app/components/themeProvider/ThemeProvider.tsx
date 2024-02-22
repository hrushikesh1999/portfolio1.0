"use client";
import { useTheme } from "@/context/ThemeContext";
import styles from "./themeProvider.module.css"

const ThemeProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const {
        position,
        sunSize,
        moonSize,
        isSunSet
    } = useTheme()

    function getBackground() {
        if (position)
            if (isSunSet) {
                return `radial-gradient(circle at ${position.x}px ${position.y}px, rgb(33, 33, 33), rgba(0, 0, 0, ${moonSize / 60}))`;
            } else {
                const brightness = sunSize / 100; // Normalize sun size to the range [0, 1]
                const calculatedBrightness = 1 - brightness; // Invert brightness for night

                const blurryWhitish = `rgba(255, 255, 255,  ${calculatedBrightness})`; // Blurry whitish effect
                const morningColor = `rgba(255, 191, 128, ${calculatedBrightness})`; // Light orange for morning
                const noonColor = `rgba(255, 166, 77, ${calculatedBrightness})`; // Warm yellow for noon
                const afternoonColor = `rgba(255, 117, 80, ${calculatedBrightness})`; // Coral for afternoon
                return `radial-gradient(circle at ${position.x}px ${position.y}px, ${blurryWhitish}, ${morningColor}, ${noonColor}, ${afternoonColor})`
            }
    }

    return (
        <div style={{ background: getBackground() }} className={`${styles.themecontainer} ${isSunSet ? styles['theme-dark'] : styles['theme-light']}`}>
            {children}
        </div>
    )
}

export default ThemeProvider