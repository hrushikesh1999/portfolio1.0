import styles from "./page.module.css";
import CanvasTheme from "@/components/canvasTheme/CanvasTheme";
import Home from "./components/home/Home"
import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
import Skills from "./components/skills/Skills";
import ToggleTheme from "./components/toggleTheme/ToggleTheme";

export default function App() {

  return (
    <main className={styles.main}>

      <div className={styles.section}>
        <CanvasTheme />
        <Home />
      </div>

      <div className={styles.section}>
        <Experience />
      </div>

      <div className={styles.section}>
        <Skills />
      </div>

      <div className={styles.section}>
        <Contact />
      </div>

      <div className={styles.toggleTheme}>
        <ToggleTheme />
      </div>

    </main>
  );
}
