"use client";

import Image from "next/image";
import Link from "next/link";
import { Caramel } from "next/font/google";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import portrait from "@/assets/images/hero-portrait.webp";
import { useScroll } from "@/context/ScrollContext";
import { useTheme } from "@/context/ThemeContext";
import buttonStyles from "@/ui/button/button.module.css";
import SkyClouds from "../skyClouds/SkyClouds";
import styles from "./home.module.css";

const caramel = Caramel({ subsets: ["latin"], weight: ["400"] });
const spring = { stiffness: 110, damping: 28, mass: 0.5 };
const portraitMask = { "--portrait-cutout": `url("${portrait.src}")` } as CSSProperties;
const heroActionClass = `${buttonStyles.btn} ${buttonStyles["btn-outlined"]} ${buttonStyles.compact}`;

function Home() {
    const { homeRef } = useScroll();
    const { isSunSet, position } = useTheme();
    const [reducedMotion, setReducedMotion] = useState(false);
    const sceneRef = useRef<HTMLDivElement>(null);
    const sceneInView = useInView(sceneRef);
    const offsetX = useMotionValue(0);
    const offsetY = useMotionValue(0);
    const x = useSpring(offsetX, spring);
    const y = useSpring(offsetY, spring);
    const glassX = useTransform(x, value => value * 0.35);
    const glassY = useTransform(y, value => value * 0.35);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene || !position) return;

        const { left, width } = scene.getBoundingClientRect();
        if (!width) return;

        const direction = Math.max(-1, Math.min(1, ((position.x - left) / width) * 2 - 1));
        scene.style.setProperty("--portrait-rim-x", `${50 + direction * 27}%`);
        scene.style.setProperty("--portrait-rim-offset", `${direction}px`);
    }, [position]);

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setReducedMotion(preference.matches);
        updatePreference();
        preference.addEventListener("change", updatePreference);
        return () => preference.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
        const hero = homeRef.current;
        if (!hero || reducedMotion || !sceneInView) return;

        function reset() {
            offsetX.set(0);
            offsetY.set(0);
        }

        // Keep the decorative layers transparent to the sky's pointer input.
        const movePortrait = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" || event.buttons) {
                reset();
                return;
            }

            const bounds = hero.getBoundingClientRect();
            const horizontal = (event.clientX - bounds.left) / bounds.width;
            const vertical = (event.clientY - bounds.top) / bounds.height;
            if (horizontal < 0 || horizontal > 1 || vertical < 0 || vertical > 1) {
                reset();
                return;
            }

            offsetX.set((horizontal - 0.5) * 12);
            offsetY.set((vertical - 0.5) * 8);
        };

        window.addEventListener("pointermove", movePortrait, { passive: true });
        document.documentElement.addEventListener("pointerleave", reset);
        window.addEventListener("blur", reset);
        return () => {
            window.removeEventListener("pointermove", movePortrait);
            document.documentElement.removeEventListener("pointerleave", reset);
            window.removeEventListener("blur", reset);
            reset();
        };
    }, [homeRef, offsetX, offsetY, reducedMotion, sceneInView]);

    const shouldFloat = !reducedMotion && sceneInView;

    return (
        <div ref={homeRef} className={styles.home} data-night={isSunSet}>
            <div className={styles.content}>
                <div className={styles.intro}>
                    <p className={styles.greet}>Hello, I&apos;m</p>
                    <h1 className={`${caramel.className} ${styles.myname}`}>Hrushikesh</h1>
                </div>
                <p className={styles.shortdesc}>
                    I combine full-stack engineering with AI to turn ideas into intelligent, scalable digital products.
                </p>
                <div className={styles.navlinks}>
                    <Link href="/projects" className={`${heroActionClass} ${styles.projectButton}`}>
                        Explore My Work
                    </Link>
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${heroActionClass} ${styles.resumeButton}`}
                        title="View resume"
                        aria-label="View resume"
                    >
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                            <path d="M14 3v6h6M8 13h8M8 17h5" />
                        </svg>
                    </a>
                </div>
            </div>

            <div ref={sceneRef} className={styles.scene}>
                <SkyClouds>
                    <motion.div
                        className={styles.glassPosition}
                        style={reducedMotion ? undefined : { x: glassX, y: glassY }}
                        aria-hidden="true"
                    >
                        <div className={styles.glass} />
                    </motion.div>
                    <motion.div style={reducedMotion ? undefined : { x, y }}>
                        <motion.div
                            className={styles.portraitDepth}
                            style={portraitMask}
                            initial={false}
                            animate={{ y: shouldFloat ? [0, -7, 0] : 0 }}
                            transition={shouldFloat ? { duration: 9, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
                        >
                            <div className={styles.portraitSurface}>
                                <Image src={portrait} alt="Hrushikesh Aavula" priority unoptimized className={styles.portrait} />
                            </div>
                        </motion.div>
                    </motion.div>
                </SkyClouds>
            </div>
        </div>
    );
}

export default Home;
