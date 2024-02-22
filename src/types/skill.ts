import { StaticImageData } from "next/image";

interface ISkillListSubItem {
    name: string;
    image: StaticImageData;
    alt: string;
}

interface ISkillListItem {
    title: string;
    items: SkillListSubItem[];
}


export type SkillListSubItem = ISkillListSubItem;
export type SkillListItem = ISkillListItem;
