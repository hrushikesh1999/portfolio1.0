"use client";
import { CONTACT, EXPERIENCE, HOME, SKILLS } from '@/constant';
import { SectionType } from '@/types/section';
import { usePathname } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

type ScrollContextProps = {
    children: ReactNode;
};


interface IScrollContext {
    homeRef: React.RefObject<HTMLDivElement>;
    experienceRef: React.RefObject<HTMLDivElement>;
    skillsRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
    scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
    activeSection: SectionType | null;
}

export const ScrollContext = createContext<IScrollContext | null>(null);

const ScrollContextProvider = ({ children }: ScrollContextProps) => {
    const pathname = usePathname();
    const homeRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<SectionType | null>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (pathname !== '/') {
            setActiveSection(null);
            return;
        }

        const sections = [
            { id: HOME, ref: homeRef },
            { id: EXPERIENCE, ref: experienceRef },
            { id: SKILLS, ref: skillsRef },
            { id: CONTACT, ref: contactRef },
        ] as const;
        const visualViewport = window.visualViewport;
        let frameId: number | null = null;

        function updateActiveSection() {
            frameId = null;

            const scrollTop = window.scrollY;
            if (scrollTop <= 1) {
                setActiveSection(HOME);
                return;
            }

            const scroller = document.scrollingElement;
            const maxScroll = scroller ? scroller.scrollHeight - scroller.clientHeight : 0;
            // Contact may never reach the top when scrolling stops at the footer.
            if (maxScroll > 0 && scrollTop >= maxScroll - 1) {
                setActiveSection(CONTACT);
                return;
            }

            const scrollPadding = parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
            const viewportOffset = visualViewport?.offsetTop ?? 0;
            const viewportTop = viewportOffset + scrollPadding;
            const viewportBottom = viewportOffset + (visualViewport?.height ?? window.innerHeight);
            let mostVisiblePixels = 0;
            let mostVisibleSections: SectionType[] = [];

            for (const { id, ref } of sections) {
                if (!ref.current) continue;
                const { top, bottom } = ref.current.getBoundingClientRect();

                // Keep a short destination active when it is aligned with the scroll padding.
                if (top >= scrollPadding && top <= scrollPadding + 2) {
                    setActiveSection(id);
                    return;
                }

                const visiblePixels = Math.min(bottom, viewportBottom) - Math.max(top, viewportTop);
                if (visiblePixels > mostVisiblePixels) {
                    mostVisiblePixels = visiblePixels;
                    mostVisibleSections = [id];
                } else if (visiblePixels > 0 && visiblePixels === mostVisiblePixels) {
                    mostVisibleSections.push(id);
                }
            }

            setActiveSection(current => {
                if (mostVisibleSections.length === 0) return current ?? HOME;
                if (current && mostVisibleSections.includes(current)) return current;
                return mostVisibleSections[0];
            });
        }

        function scheduleUpdate() {
            if (frameId === null) frameId = window.requestAnimationFrame(updateActiveSection);
        }

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        visualViewport?.addEventListener('scroll', scheduleUpdate, { passive: true });
        visualViewport?.addEventListener('resize', scheduleUpdate);
        const resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(document.body);
        for (const { ref } of sections) {
            if (ref.current) resizeObserver.observe(ref.current);
        }
        scheduleUpdate();

        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            visualViewport?.removeEventListener('scroll', scheduleUpdate);
            visualViewport?.removeEventListener('resize', scheduleUpdate);
            resizeObserver.disconnect();
            if (frameId !== null) window.cancelAnimationFrame(frameId);
        };
    }, [pathname]);

    return (
        <ScrollContext.Provider value={{
            homeRef,
            experienceRef,
            skillsRef,
            contactRef,
            scrollToSection,
            activeSection,
        }}>
            {children}
        </ScrollContext.Provider>
    );
};

export default ScrollContextProvider

export const useScroll = (): IScrollContext => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScroll must be used within a ScrollContextProvider');
    }
    return context;
};
