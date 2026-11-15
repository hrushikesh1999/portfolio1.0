"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./skyClouds.module.css";

export default function SkyClouds({ children }: { children: ReactNode }) {
    const { isSunSet, sunSize, moonSize } = useTheme();
    const size = isSunSet ? moonSize : sunSize;
    const intensity = Math.max(0, Math.min(1, (size - 10) / 50));
    const opacity = intensity * (isSunSet ? 0.7 : 1);
    const layerClass = `${styles.clouds} ${isSunSet ? styles.night : ""}`;

    return (
        <>
            <div aria-hidden="true" className={layerClass} style={{ opacity }}>
                <span className={styles.cloud} />
                <span className={styles.cloud} />
                <span className={styles.cloud} />
            </div>
            {children}
            <div aria-hidden="true" className={layerClass} style={{ opacity: opacity * 0.72 }}>
                <span className={styles.foregroundCloud} />
            </div>
        </>
    );
}
