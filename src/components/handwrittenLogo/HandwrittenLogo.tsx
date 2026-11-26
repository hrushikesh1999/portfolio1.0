"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";
import { drawStroke, strokes, type Stroke } from "./handwrittenStrokes";
import styles from "./handwrittenLogo.module.css";

const START_DELAY_SECONDS = 1.5;
const completedStrokes = strokes.map((stroke) => drawStroke(stroke, 1));

function AnimatedStroke({ stroke }: { stroke: Stroke }) {
    const progress = useMotionValue(0);
    const outline = useTransform(progress, (fraction) => drawStroke(stroke, fraction));

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            progress.set(1);
            return;
        }

        const animation = animate(progress, 1, {
            delay: START_DELAY_SECONDS + stroke.delay,
            duration: stroke.duration,
            ease: [0.3, 0, 0.4, 1],
        });

        return () => animation.stop();
    }, [progress, stroke]);

    return <motion.path d={outline} />;
}

export default function HandwrittenLogo() {
    return (
        <div className={styles.container}>
            <svg
                viewBox="0 0 146 146"
                className={styles.logo}
                role="img"
                aria-label="Hrushikesh Aavula's handwritten H"
            >
                <g className={styles.animated}>
                    {strokes.map((stroke) => <AnimatedStroke key={stroke.name} stroke={stroke} />)}
                </g>
                <g className={styles.completed}>
                    {completedStrokes.map((outline) => <path key={outline} d={outline} />)}
                </g>
            </svg>
        </div>
    );
}
