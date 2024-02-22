import { RefObject } from "react";

interface ISection {
    id: SectionType;
    name: string;
    ref: RefObject<HTMLDivElement>;
}

export type SectionType = 'home' | 'contact' | 'experience' | 'skills'
export type Section = ISection