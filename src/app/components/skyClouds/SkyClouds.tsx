"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./skyClouds.module.css";

export default function SkyClouds({ children }: { children: ReactNode }) {
    const { isSunSet, sunSize, moonSize } = useTheme();
    const size = isSunSet ? moonSize : sunSize;
    const intensity = Math.max(0, Math.min(1, (size - 10) / 50));
    const opacity = (0.45 + intensity * 0.55) * (isSunSet ? 0.55 : 1);
    const cloudClass = `${styles.clouds} ${isSunSet ? styles.night : ""}`;
    const distantWisp = `${styles.cloudTexture} ${styles.distantWisp}`;
    const foregroundWisp = `${styles.cloudTexture} ${styles.foregroundWisp}`;

    return (
        <>
            <div aria-hidden="true" className={`${cloudClass} ${styles.distant}`} style={{ opacity }}>
                <span className={distantWisp} />
                <span className={distantWisp} />
            </div>
            {children}
            <div aria-hidden="true" className={`${cloudClass} ${styles.foreground}`} style={{ opacity }}>
                <span className={foregroundWisp} />
                <span className={foregroundWisp} />
            </div>
            <div aria-hidden="true" className={`${cloudClass} ${styles.ambient}`} style={{ opacity }}>
                <span className={styles.haze} />
            </div>
        </>
    );
}
