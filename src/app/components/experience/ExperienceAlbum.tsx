import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import Button from "@/ui/button/Button";
import ExperiencePage from "./ExperiencePage";
import type { ExperienceEntry } from "./experienceConfig";
import useAlbumNavigation, { pageTurnDuration } from "./useAlbumNavigation";
import styles from "./experience.module.css";

type Props = {
    pages: readonly ExperienceEntry[];
};

const turnTransition = { duration: pageTurnDuration, ease: "easeInOut" } as const;
const stackSpring = { type: "spring", stiffness: 330, damping: 30 } as const;
const panelVariants = {
    rest: { rotateY: 0, transition: { duration: 0 } },
    forward: { rotateY: [0, -180], transition: turnTransition },
    backward: { rotateY: [-180, 0], transition: turnTransition },
} satisfies Variants;
const edgeVariants = {
    enter: { opacity: 0.55, scale: 0.98 },
    rest: { opacity: 1, scale: 1 },
    hover: { opacity: 1, scale: 1 },
} satisfies Variants;

const ExperienceAlbum = ({ pages }: Props) => {
    const albumRef = useRef<HTMLDivElement>(null);
    const {
        activePage, targetPage, hasNavigated, direction, isTurning, prefersReducedMotion, turnTo, finishTurn,
    } = useAlbumNavigation(pages.length);

    if (pages.length === 0) return null;

    const nextPage = activePage + direction;
    const visiblePage = Math.max(activePage, nextPage);
    const leftStackStart = Math.min(activePage, nextPage);
    const turnDirection = direction < 0 ? "backward" : "forward";

    const handleArrowKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

        event.preventDefault();
        const targetPage = activePage + (event.key === "ArrowLeft" ? -1 : 1);
        if (event.repeat || isTurning || targetPage < 0 || targetPage >= pages.length) return;

        if (!(event.target instanceof Element && event.target.closest("[data-album-control]"))) {
            albumRef.current?.focus({ preventScroll: true });
        }
        turnTo(targetPage);
    };

    return (
        <div
            ref={albumRef}
            className={styles.album}
            role="group"
            aria-label="Experience album"
            tabIndex={-1}
            onKeyDown={handleArrowKey}
        >
            <div className={styles.stage}>
                <div className={styles.pages}>
                    <span className={styles.binding} aria-hidden="true" />
                    {pages.map((page, index) => {
                        const turning = isTurning && index === leftStackStart;
                        const underlay = isTurning && index === visiblePage;
                        const turn = turning ? turnDirection : "rest";
                        const content = prefersReducedMotion || !hasNavigated || index !== targetPage
                            ? "rest"
                            : isTurning ? "prepare" : "reveal";

                        return (
                            <div
                                key={page.title}
                                className={styles.pageSlot}
                                data-visible={index === visiblePage}
                                data-turning={turning}
                                aria-hidden={index !== activePage}
                            >
                                <motion.div
                                    className={styles.panel}
                                    initial={false}
                                    animate={turn}
                                    variants={panelVariants}
                                    onAnimationComplete={definition => {
                                        if (turning && definition === turn) finishTurn();
                                    }}
                                >
                                    <ExperiencePage
                                        experience={page}
                                        content={content}
                                        underlayDirection={underlay ? direction : 0}
                                        turnDuration={pageTurnDuration}
                                        tabIndex={index === activePage && !isTurning ? 0 : undefined}
                                    />
                                    {turning && (
                                        <motion.span
                                            className={styles.reflection}
                                            aria-hidden="true"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.65, 0] }}
                                            transition={{ ...turnTransition, times: [0, 0.45, 1] }}
                                        />
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}

                    {pages.map((page, index) => {
                        const isPrevious = index < leftStackStart;
                        const depth = isPrevious ? leftStackStart - index : index - visiblePage;
                        if (depth < 1 || depth > 2) return null;

                        const edgeOpacity = isPrevious ? 0.65 : 0.8;
                        return (
                            <motion.button
                                key={page.title}
                                type="button"
                                className={styles.edge}
                                data-side={isPrevious ? "previous" : "next"}
                                data-depth={depth}
                                aria-label={`Turn to ${page.title}`}
                                aria-disabled={isTurning}
                                title={page.title}
                                layout={!prefersReducedMotion}
                                initial={hasNavigated && !prefersReducedMotion ? "enter" : false}
                                animate="rest"
                                whileHover={isTurning || prefersReducedMotion ? undefined : "hover"}
                                variants={edgeVariants}
                                transition={prefersReducedMotion ? { duration: 0 } : stackSpring}
                                onClick={() => {
                                    if (isTurning) return;
                                    albumRef.current?.focus({ preventScroll: true });
                                    turnTo(index);
                                }}
                            >
                                <motion.span
                                    aria-hidden="true"
                                    className={styles.edgeSurface}
                                    variants={{
                                        enter: { "--edge-extension": "0px", opacity: edgeOpacity },
                                        rest: { "--edge-extension": "0px", opacity: edgeOpacity },
                                        hover: { "--edge-extension": "6px", opacity: 1 },
                                    }}
                                    transition={prefersReducedMotion ? { duration: 0 } : stackSpring}
                                />
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.pagination} role="group" aria-label="Choose an experience">
                {pages.map((page, index) => (
                    <Button
                        key={page.title}
                        type="button"
                        className={styles.dot}
                        data-album-control
                        aria-label={`Show ${page.title}`}
                        aria-current={index === activePage ? "page" : undefined}
                        aria-disabled={isTurning}
                        onClick={() => turnTo(index)}
                    />
                ))}
            </div>
            <span className={styles.srOnly} aria-live="polite" aria-atomic="true">
                {pages[activePage].title}
            </span>
        </div>
    );
};

export default ExperienceAlbum;
