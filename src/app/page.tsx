import styles from "./page.module.css";
import CanvasTheme from "@/components/canvasTheme/CanvasTheme";
import Home from "./components/home/Home"
import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
import Skills from "./components/skills/Skills";
import ToggleTheme from "./components/toggleTheme/ToggleTheme";
import { CONTACT, EXPERIENCE, HOME, SKILLS } from "@/constant";

export default function App() {

  return (
    <main className={styles.main}>

      <div id={HOME} className={`${styles.section} ${styles.homeSection}`}>
        <CanvasTheme />
        <Home />
      </div>

      <div id={EXPERIENCE} className={styles.section}>
        <Experience />
      </div>

      <div id={SKILLS} className={styles.section}>
        <Skills />
      </div>

      <div id={CONTACT} className={styles.section}>
        <Contact />
      </div>

      <div className={styles.toggleTheme}>
        <ToggleTheme />
      </div>

    </main>
  );
}
