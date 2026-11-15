"use client"
import { useScroll } from "@/context/ScrollContext";
import styles from "./home.module.css"
import AccountLinks from "@/components/accountLinks/AccountLinks";
import Button from "@/ui/button/Button";
import Link from "next/link";
import projectLinkStyles from "@/ui/projectLink.module.css";
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
                    <Button className={styles.resumeButton} variant="outlined" onClick={() => window.open("/resume.pdf", "_blank")} title="View resume" aria-label="View resume">
                        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                            <path d="M14 3v6h6M8 13h8M8 17h5" />
                        </svg>
                    </Button>
                    <Link href="/projects" className={projectLinkStyles.link}>
                        See what I’ve built <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
