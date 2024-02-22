import javascript from "../../../assets/images/javascript.png";
import typescript from "../../../assets/images/typescript.png";
import html from "../../../assets/images/html.png";
import css from "../../../assets/images/css.png";
import sass from "../../../assets/images/sass.png";
import python from "../../../assets/images/python.png";
import bootstrap from "../../../assets/images/bootstrap.png";
import git from "../../../assets/images/git.png";
import github from "../../../assets/images/github.png";
import react from "../../../assets/images/react.png";
import nextjs from "../../../assets/images/nextjs.png";
import redux from "../../../assets/images/redux.png";
import node from "../../../assets/images/node.png";
import mui from "../../../assets/images/mui.png";
import reactstrap from "../../../assets/images/reactstrap.png";
import geoserver from "../../../assets/images/geoserver.png";
import openlayers from "../../../assets/images/openlayers.png";
import mongodb from "../../../assets/images/mongodb.png";
import postgresql from "../../../assets/images/postgresql.png";
import { SkillListItem } from "@/types/skill";

const skillList: SkillListItem[] = [
    {
        title: "Web Development",
        items: [
            {
                name: "Html",
                image: html,
                alt: "html icon",
            },
            {
                name: "React js",
                image: react,
                alt: "react icon",
            },
            {
                name: "Next js",
                image: nextjs,
                alt: "nextjs icon",
            },
            {
                name: "Redux",
                image: redux,
                alt: "redux icon",
            },
            {
                name: "Node js",
                image: node,
                alt: "node icon",
            },
        ],
    },
    {
        title: "Web Design",
        items: [
            {
                name: "Css",
                image: css,
                alt: "css icon",
            },
            {
                name: "Sass",
                image: sass,
                alt: "sass icon",
            },
            {
                name: "Material UI",
                image: mui,
                alt: "material ui icon",
            },
            {
                name: "Reactstrap",
                image: reactstrap,
                alt: "reactstrap icon",
            },
            {
                name: "Bootstrap",
                image: bootstrap,
                alt: "bootstrap icon",
            },
        ],
    },
    {
        title: "Programming",
        items: [
            {
                name: "Javascript",
                image: javascript,
                alt: "javascript icon",
            },
            {
                name: "Typescript",
                image: typescript,
                alt: "typescript icon",
            },
            {
                name: "Python",
                image: python,
                alt: "python icon",
            },
        ],
    },
    {
        title: "GIS",
        items: [
            {
                name: "Geoserver",
                image: geoserver,
                alt: "geoserver icon",
            },
            {
                name: "Openlayers",
                image: openlayers,
                alt: "openlayers icon",
            },
        ],
    },
    {
        title: "DB",
        items: [
            {
                name: "MongoDB",
                image: mongodb,
                alt: "mongodb icon",
            },
            {
                name: "PostgreSQL",
                image: postgresql,
                alt: "postgre sql icon",
            },
        ],
    },
    {
        title: "Version Control",
        items: [
            {
                name: "Git",
                image: git,
                alt: "git icon",
            },
            {
                name: "Github",
                image: github,
                alt: "github icon",
            },
        ],
    },
];

export default skillList;
