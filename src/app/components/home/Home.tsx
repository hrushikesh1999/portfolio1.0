"use client"
import { useScroll } from "@/context/ScrollContext";
import styles from "./home.module.css"
import AccountLinks from "@/components/accountLinks/AccountLinks";
import Button from "@/ui/button/Button";
import { Caramel } from "next/font/google";

const caramel = Caramel({ subsets: ["latin"], weight: ['400'] });

const Home = () => {
    const { homeRef, contactRef, scrollToSection } = useScroll();
    return (
        <div ref={homeRef} className={styles.home}>
            <div>
                <h3 className={styles.greet}>
                    Hello, I&apos;m
                </h3>
                <div className={caramel.className}>
                    <h1 className={styles.myname}>
                        Hrushikesh
                    </h1>
                </div>
                <p className={styles.shortdesc}>
                    A web enthusiast who loves to dabble in the art of full-stack development.<br />
                    Currently shaping code as a software developer, I find joy in making the web more interactive.
                    My go-to? JavaScript.<br />
                    Let&apos;s explore the digital world together, one line of code at a time!
                </p>
                <AccountLinks />
                <div className={styles.navlinks}>
                    <Button variant="outlined" onClick={() => scrollToSection(contactRef)}>
                        Reach out to me!
                    </Button>
                    <Button variant="outlined" onClick={() => window.open("/resume.pdf", "_blank")}>
                        📄view resume
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home