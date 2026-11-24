import { forwardRef, useEffect, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import { motion, useIsPresent } from "motion/react";
import type { Skill } from "@/types/skill";
import styles from "./skills.module.css";

type Props = Skill & {
    visible: boolean;
    reducedMotion: boolean;
    entranceDelay?: number;
};

const spring = { type: "spring", stiffness: 400, damping: 32, mass: 0.8 } as const;
const beforeEntrance = { opacity: 0, y: 6, scale: 1 };
const beforeReturn = { opacity: 0, y: 0, scale: 0.985 };
const restingTile = { opacity: 1, y: 0, scale: 1 };
const departingTile = { opacity: 0, scale: 0.98, transition: { duration: 0.12, ease: "easeOut" } } as const;

const updateReflection = (event: PointerEvent<HTMLLIElement>) => {
    if (event.pointerType === "touch") return;

    const tile = event.currentTarget;
    const { left, top, width, height } = tile.getBoundingClientRect();
    tile.style.setProperty("--reflection-x", `${event.clientX - left - width / 2}px`);
    tile.style.setProperty("--reflection-y", `${event.clientY - top - height / 2}px`);
};

const SkillTile = forwardRef<HTMLLIElement, Props>(function SkillTile(
    { name, image, accent, visible, reducedMotion, entranceDelay },
    ref,
) {
    const isPresent = useIsPresent();
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const interactive = isPresent && visible && !reducedMotion;
    const lift = interactive && hovered;
    const press = interactive && pressed;
    const releasePress = () => setPressed(false);

    useEffect(() => {
        if (interactive) return;
        setHovered(false);
        setPressed(false);
    }, [interactive]);

    return (
        <motion.li
            ref={ref}
            className={styles.tile}
            style={{ "--skill-accent": accent } as CSSProperties}
            aria-hidden={!isPresent || undefined}
            data-exiting={!isPresent || undefined}
            data-reflecting={lift || undefined}
            layout={reducedMotion ? false : "position"}
            initial={reducedMotion ? false : entranceDelay === undefined ? beforeReturn : beforeEntrance}
            animate={visible || reducedMotion ? restingTile : beforeEntrance}
            exit={reducedMotion ? { opacity: 0, transition: { duration: 0 } } : departingTile}
            transition={reducedMotion ? { duration: 0 } : {
                y: { ...spring, delay: entranceDelay ?? 0 },
                opacity: { duration: 0.16, delay: entranceDelay ?? 0.08, ease: "easeOut" },
                scale: spring,
                layout: spring,
            }}
            onHoverStart={interactive ? () => setHovered(true) : undefined}
            onHoverEnd={interactive ? () => setHovered(false) : undefined}
            onTapStart={interactive ? () => setPressed(true) : undefined}
            onTap={interactive ? releasePress : undefined}
            onTapCancel={interactive ? releasePress : undefined}
            tabIndex={interactive ? -1 : undefined}
            onPointerEnter={interactive ? updateReflection : undefined}
            onPointerMove={interactive ? updateReflection : undefined}
        >
            <motion.div
                className={styles.tileBlock}
                initial={false}
                animate={{ y: lift ? -4 : 0, scale: press ? 0.98 : lift ? 1.025 : 1 }}
                transition={reducedMotion ? { duration: 0 } : spring}
            >
                <div className={styles.tileFace}>
                    <Image className={styles.tileLogo} src={image} alt="" width={28} height={28} />
                    <span className={styles.tileLabel}>{name}</span>
                </div>
            </motion.div>
        </motion.li>
    );
});

export default SkillTile;
