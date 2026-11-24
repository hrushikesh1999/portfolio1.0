import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const pageTurnDuration = 0.7;

const useAlbumNavigation = (pageCount: number) => {
    const initialReducedMotion = useReducedMotion();
    const [updatedPreference, setUpdatedPreference] = useState<boolean>();
    const prefersReducedMotion = updatedPreference ?? initialReducedMotion ?? false;
    const [navigation, setNavigation] = useState({ activePage: 0, targetPage: 0, hasNavigated: false });
    const { activePage, targetPage } = navigation;
    const direction = Math.sign(targetPage - activePage);
    const isTurning = direction !== 0;

    useEffect(() => {
        // Motion reads the initial preference. Listen for changes while the album is open.
        const preference = window.matchMedia(reducedMotionQuery);
        const updatePreference = () => setUpdatedPreference(preference.matches);
        updatePreference();
        preference.addEventListener("change", updatePreference);
        return () => preference.removeEventListener("change", updatePreference);
    }, []);

    const turnTo = (page: number) => {
        if (page < 0 || page >= pageCount) return;

        setNavigation(current => {
            if (current.activePage !== current.targetPage || current.activePage === page) return current;

            return {
                activePage: prefersReducedMotion ? page : current.activePage,
                targetPage: page,
                hasNavigated: true,
            };
        });
    };

    const finishTurn = useCallback(() => {
        if (!direction) return;

        // A completion callback can arrive after a newer turn has already started.
        setNavigation(current => current === navigation ? {
            activePage: prefersReducedMotion ? targetPage : activePage + direction,
            targetPage,
            hasNavigated: true,
        } : current);
    }, [activePage, direction, navigation, prefersReducedMotion, targetPage]);

    useEffect(() => {
        if (!isTurning) return;

        if (prefersReducedMotion) finishTurn();
    }, [finishTurn, isTurning, prefersReducedMotion]);

    return { ...navigation, direction, isTurning, prefersReducedMotion, turnTo, finishTurn };
};

export default useAlbumNavigation;
