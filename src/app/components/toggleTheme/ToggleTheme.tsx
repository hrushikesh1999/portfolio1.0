"use client";
import MoonIcon from "@/assets/icons/MoonIcon";
import SunIcon from "@/assets/icons/SunIcon";
import Button from "@/ui/button/Button"
import styles from "./toggleTheme.module.css"
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
    const {
        sunSize, setSunSize,
        moonSize, setMoonSize,
        isSunSet, setIsSunSet
    } = useTheme()
    const [isToggling, setIsToggling] = useState(false);

    useEffect(() => {
        let toggleInterval: NodeJS.Timeout;

        if (isToggling) {
            let sSize = sunSize
            let mSize = moonSize
            const maxSize = 60
            toggleInterval = setInterval(() => {

                if (sSize === 10) {
                    setMoonSize((prevSize) => {
                        const newSize = Math.max(10, Math.min(prevSize - (isSunSet ? +100 : -100) / 30, maxSize));
                        mSize = newSize
                        if (newSize === 10) {
                            setIsSunSet(false);
                        } else {
                            setIsSunSet(true);
                        }
                        return newSize;
                    });
                }
                if (mSize === 10) {
                    setSunSize((prevSize) => {
                        const newSize = Math.max(10, Math.min(prevSize + (isSunSet ? +100 : -100) / 30, maxSize));
                        sSize = newSize
                        if (newSize === 10) {
                            setIsSunSet(true);
                        } else {
                            setIsSunSet(false);
                        }
                        return newSize;
                    });
                }

                if (isSunSet && sSize === maxSize) {
                    clearInterval(toggleInterval)
                    setIsToggling(false)
                }

                if (!isSunSet && mSize === maxSize) {
                    clearInterval(toggleInterval)
                    setIsToggling(false)
                }
            }, 15);
        }

        return () => {
            clearInterval(toggleInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isToggling]);

    function onToggleThemeClick() {
        setIsToggling(true);
    }

    return (
        <div className={styles.toggleThemeBtn}>
            <Button disabled={isToggling} onClick={onToggleThemeClick}>
                {isSunSet ? <SunIcon width="15" height="15" /> : <MoonIcon width="15" height="15" />}
            </Button>
        </div>
    )
}

export default ToggleTheme