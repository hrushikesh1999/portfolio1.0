
const experienceConfig = [
    {
        title: "TRC Companies, Inc.",
        roles: [
            { role: "Associate Architect", from: "2025", to: "Present" },
            { role: "Senior Software Engineer", from: "2024", to: "2025" },
            { role: "Software Engineer", from: "2023", to: "2024" },
        ],
        description: `
      Building scalable backend systems and AI-powered applications, focusing on system architecture, APIs, automation, and AI integrations.

      - Developed backend services and microservices using FastAPI, Node.js, and PostgreSQL.
      - Built AI-powered workflows using LLMs, RAG, tool calling, and AI agents.
      - Developed real-time features, optimized application performance, and contributed to system architecture.
    `,
        from: "2023",
        to: "Present",
        tags: [
            "Python",
            "FastAPI",
            "Node.js",
            "TypeScript",
            "PostgreSQL",
            "React",
            "LangGraph",
            "LLMs",
            "RAG",
            "AWS",
            "Docker",
        ],
    },
    {
        title: "Neudesic Technologies Private Limited.",
        roles: [
            { role: "Associate Consultant", from: "2022", to: "2023" },
        ],
        description: `
      Developed scalable web applications with a focus on frontend architecture, performance, and state management.

      - Built responsive, reusable React components.
      - Implemented role-based access and state management using Redux.
      - Optimized API integrations and frontend performance.
    `,
        from: "2022",
        to: "2023",
        tags: [
            "React",
            "TypeScript",
            "Redux Toolkit",
            "Redux Saga",
            "TanStack Query",
            ".NET",
        ],
    },
    {
        title: "iMapAnalytica Technologies Pvt Ltd.",
        roles: [
            { role: "Web Developer", from: "2021", to: "2022" },
        ],
        description: `
      Developed web applications using React and Node.js, focusing on interactive interfaces and API integrations.

      - Built reusable React components and implemented state management.
      - Developed REST APIs using Node.js and Express.
      - Integrated geospatial features using OpenLayers and ArcGIS.
    `,
        from: "2021",
        to: "2022",
        tags: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "OpenLayers",
            "ArcGIS",
        ],
    },
];

export type ExperienceEntry = (typeof experienceConfig)[number];

export default experienceConfig;
