import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import assistlyScreenshot from "@/assets/images/assistly-proj.png";
import steadyScreenshot from "@/assets/images/steady-proj.png";
import buttonStyles from "@/ui/button/button.module.css";
import projectLinkStyles from "@/ui/projectLink.module.css";
import ToggleTheme from "../components/toggleTheme/ToggleTheme";
import pageStyles from "../page.module.css";
import styles from "./projects.module.css";

export const metadata: Metadata = {
    title: "Projects | Hrushikesh",
    description: "Assistly and Steady, two full-stack projects by Hrushikesh Aavula.",
};

const projects = [
    {
        id: "assistly",
        name: "Assistly",
        screenshot: assistlyScreenshot,
        screenshotAlt: "Screenshot of the Assistly web app",
        subtitle: "AI Customer Support & Booking",
        description: "Answers customer questions and helps them book, reschedule, or cancel appointments through website chat. Staff manage bookings and take over conversations when needed.",
        details: "Single-business clinic demo. WhatsApp tested with simulated messages; live Meta verification pending.",
        demo: "https://assistly-web.hrushikesh007007.workers.dev/demo",
    },
    {
        id: "steady",
        name: "Steady",
        screenshot: steadyScreenshot,
        screenshotAlt: "Screenshot of the Steady web app",
        subtitle: "Financial Preparedness Planner",
        description: "Helps salaried people in India decide where their next rupee should go. Turn savings, insurance, and debt into clear priorities and a projected monthly plan.",
        details: "Explore a worked example in the app. Your financial details stay in your browser.",
        demo: "https://steady-web.hrushikesh007007.workers.dev/",
    },
];

const textLink = `${styles.link} ${buttonStyles.btn} ${buttonStyles["btn-text"]}`;

export default function ProjectsPage() {
    return (
        <main className={styles.projects}>
            <header className={styles.intro}>
                <Link href="/" className={textLink} aria-label="Back to home" title="Back to home">
                    <span className={styles.backArrow} aria-hidden="true">←</span>
                </Link>
                <h1>Projects</h1>
            </header>

            <div className={styles.grid}>
                {projects.map(({ id, name, screenshot, screenshotAlt, subtitle, description, details, demo }) => (
                    <article key={id} className={styles.panel} data-project={id}>
                        <div className={styles.preview}>
                            <Image
                                src={screenshot}
                                alt={screenshotAlt}
                                className={styles.screenshot}
                                sizes="(max-width: 768px) calc(100vw - 6rem), (max-width: 992px) calc(100vw - 16rem), 50vw"
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <header className={styles.cardIntro}>
                                <h2 className={styles.projectName}>{name}</h2>
                                <p className={styles.subtitle}>{subtitle}</p>
                                <p className={styles.description}>{description}</p>
                            </header>
                            <p className={styles.details}>{details}</p>
                            <div className={styles.actions}>
                                <a href={demo} target="_blank" rel="noopener noreferrer" className={projectLinkStyles.link}>Open {name} ↗</a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className={pageStyles.toggleTheme}><ToggleTheme /></div>
        </main>
    );
}
