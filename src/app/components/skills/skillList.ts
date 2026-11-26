// Generative AI
import llm from "../../../assets/images/llm.png";
import langgraph from "../../../assets/images/langgraph.png";
import langchain from "../../../assets/images/langchain.png";
import aiAgents from "../../../assets/images/ai-agents.png";
import rag from "../../../assets/images/rag.png";
import toolCalling from "../../../assets/images/tool-calling.png";
import openai from "../../../assets/images/openai.png";
import vectorDatabase from "../../../assets/images/vector-database.png";

// Programming & Backend
import python from "../../../assets/images/python.png";
import fastapi from "../../../assets/images/fastapi.png";
import node from "../../../assets/images/node.png";
import typescript from "../../../assets/images/typescript.png";
import javascript from "../../../assets/images/javascript.png";
import express from "../../../assets/images/express.png";
import socketio from "../../../assets/images/socketio.png";
import rabbitmq from "../../../assets/images/rabbitmq.png";

// Frontend
import react from "../../../assets/images/react.png";
import nextjs from "../../../assets/images/nextjs.png";
import redux from "../../../assets/images/redux.png";
import html from "../../../assets/images/html.png";
import css from "../../../assets/images/css.png";
import sass from "../../../assets/images/sass.png";
import mui from "../../../assets/images/mui.png";
import bootstrap from "../../../assets/images/bootstrap.png";

// Databases
import postgresql from "../../../assets/images/postgresql.png";
import mongodb from "../../../assets/images/mongodb.png";
import redis from "../../../assets/images/redis.png";
import pgvector from "../../../assets/images/pgvector.png";
import postgis from "../../../assets/images/postgis.png";

// Cloud & DevOps
import aws from "../../../assets/images/aws.png";
import docker from "../../../assets/images/docker.png";
import git from "../../../assets/images/git.png";
import github from "../../../assets/images/github.png";
import grafana from "../../../assets/images/grafana.png";
import keycloak from "../../../assets/images/keycloak.png";

// Geospatial
import geoserver from "../../../assets/images/geoserver.png";
import openlayers from "../../../assets/images/openlayers.png";
import arcgis from "../../../assets/images/arcgis.png";

import type { Skill } from "@/types/skill";

const skillList: Skill[] = [
    { name: "LLMs", image: llm, accent: "#8b5cf6" },
    { name: "LangGraph", image: langgraph, accent: "#36b5a0" },
    { name: "Python", image: python, accent: "#3776ab" },
    { name: "FastAPI", image: fastapi, accent: "#009688" },
    { name: "AI Agents", image: aiAgents, accent: "#a78bfa" },
    { name: "RAG", image: rag, accent: "#6366f1" },
    { name: "Node.js", image: node, accent: "#68a063" },
    { name: "React.js", image: react, accent: "#61dafb" },
    { name: "TypeScript", image: typescript, accent: "#3178c6" },
    { name: "PostgreSQL", image: postgresql, accent: "#336791" },
    { name: "AWS", image: aws, accent: "#ff9900" },
    { name: "Docker", image: docker, accent: "#2496ed" },
    { name: "LangChain", image: langchain, accent: "#36b5a0" },
    { name: "Tool Calling", image: toolCalling, accent: "#0ea5e9" },
    { name: "Redis", image: redis, accent: "#dc382d" },
    { name: "OpenAI API", image: openai, accent: "#10a37f" },
    { name: "Vector DB", image: vectorDatabase, accent: "#8b5cf6" },
    { name: "JavaScript", image: javascript, accent: "#f7df1e" },
    { name: "Express.js", image: express, accent: "#8a8a8a" },
    { name: "Next.js", image: nextjs, accent: "#8a8a8a" },
    { name: "Redux Toolkit", image: redux, accent: "#764abc" },
    { name: "MongoDB", image: mongodb, accent: "#47a248" },
    { name: "pgvector", image: pgvector, accent: "#336791" },
    { name: "PostGIS", image: postgis, accent: "#6b9e3f" },
    { name: "Socket.IO", image: socketio, accent: "#8a8a8a" },
    { name: "RabbitMQ", image: rabbitmq, accent: "#ff6600" },
    { name: "Git", image: git, accent: "#f05032" },
    { name: "GitHub", image: github, accent: "#8a8a8a" },
    { name: "Grafana", image: grafana, accent: "#f46800" },
    { name: "Keycloak", image: keycloak, accent: "#4d9de0" },
    { name: "OpenLayers", image: openlayers, accent: "#1f9fb3" },
    { name: "GeoServer", image: geoserver, accent: "#55a346" },
    { name: "ArcGIS REST API", image: arcgis, accent: "#007ac2" },
    { name: "HTML5", image: html, accent: "#e34f26" },
    { name: "CSS3", image: css, accent: "#1572b6" },
    { name: "Sass", image: sass, accent: "#cc6699" },
    { name: "MUI", image: mui, accent: "#007fff" },
    { name: "Bootstrap", image: bootstrap, accent: "#7952b3" },
];

export default skillList;