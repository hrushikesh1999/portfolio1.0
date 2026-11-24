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
import type { Skill } from "@/types/skill";

const skillList: Skill[] = [
    { name: "Html", image: html, accent: "#e34f26" },
    { name: "React js", image: react, accent: "#61dafb" },
    { name: "Next js", image: nextjs, accent: "#8a8a8a" },
    { name: "Redux", image: redux, accent: "#764abc" },
    { name: "Node js", image: node, accent: "#68a063" },
    { name: "Css", image: css, accent: "#1572b6" },
    { name: "Sass", image: sass, accent: "#cc6699" },
    { name: "Material UI", image: mui, accent: "#007fff" },
    { name: "Reactstrap", image: reactstrap, accent: "#61dafb" },
    { name: "Bootstrap", image: bootstrap, accent: "#7952b3" },
    { name: "Javascript", image: javascript, accent: "#f7df1e" },
    { name: "Typescript", image: typescript, accent: "#3178c6" },
    { name: "Python", image: python, accent: "#3776ab" },
    { name: "Geoserver", image: geoserver, accent: "#55a346" },
    { name: "Openlayers", image: openlayers, accent: "#1f9fb3" },
    { name: "MongoDB", image: mongodb, accent: "#47a248" },
    { name: "PostgreSQL", image: postgresql, accent: "#336791" },
    { name: "Git", image: git, accent: "#f05032" },
    { name: "Github", image: github, accent: "#8a8a8a" },
];

export default skillList;
