"use client";
import { CONTACT, EXPERIENCE, HOME, SKILLS } from '@/constant';
import { SectionType } from '@/types/section';
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
    const homeRef = useRef(null);
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);
    const contactRef = useRef(null);
    const [activeSection, setActiveSection] = useState<SectionType | null>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                switch (entry.target) {
                    case homeRef.current:
                        setActiveSection(HOME);
                        break;
                    case experienceRef.current:
                        setActiveSection(EXPERIENCE);
                        break;
                    case skillsRef.current:
                        setActiveSection(SKILLS);
                        break;
                    case contactRef.current:
                        setActiveSection(CONTACT);
                        break;
                    default:
                        setActiveSection(null);
                }
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.8,
        });

        if (homeRef.current) observer.observe(homeRef.current);
        if (experienceRef.current) observer.observe(experienceRef.current);
        if (skillsRef.current) observer.observe(skillsRef.current);
        if (contactRef.current) observer.observe(contactRef.current);

        return () => {
            observer.disconnect();
        };
    }, [homeRef, contactRef]);

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