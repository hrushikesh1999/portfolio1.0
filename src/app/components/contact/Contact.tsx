"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent, PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useScroll } from "@/context/ScrollContext";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import TextField from "@/ui/textField/TextField";
import TextArea from "@/ui/textArea/TextArea";
import Button from "@/ui/button/Button";
import type { ContactInfo } from "@/types/contact";
import styles from "./contact.module.css";

type Phase = "closed" | "opening" | "open" | "closing";
type SendStatus = "idle" | "sending" | "sent" | "error";

const initialContact: ContactInfo = {
    name: "",
    email: "",
    message: "",
};

const flapDuration = 0.32;
const letterDuration = 0.48;
const liftDelay = 0.24;
const foldDelay = 0.39;
const ease = [0.25, 0.7, 0.25, 1] as const;

const sendStatusText = {
    idle: "",
    sending: "Sending your message…",
    sent: "Message sent.",
    error: "Your message couldn’t be sent. Please try again.",
};

function resetTilt(event: PointerEvent<HTMLButtonElement>) {
    const surface = event.currentTarget.parentElement?.style;
    surface?.removeProperty("--tilt-x");
    surface?.removeProperty("--tilt-y");
    surface?.removeProperty("--reflection-x");
    surface?.removeProperty("--reflection-y");
}

const Contact = () => {
    const [contact, setContact] = useState(initialContact);
    const [phase, setPhase] = useState<Phase>("closed");
    const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
    const triggerRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const sendingRef = useRef(false);
    const { contactRef } = useScroll();
    const reducedMotion = useReducedMotion();
    const letterId = useId();
    const hintId = useId();
    const closed = phase === "closed";
    const open = phase === "open";
    const expanded = open || phase === "opening";
    const formLocked = sendStatus === "sending" || sendStatus === "sent";
    const canToggle = closed || (open && !formLocked);
    const letterTransition = reducedMotion
        ? { duration: 0 }
        : { duration: letterDuration, delay: expanded ? liftDelay : 0, ease };
    const flapTransition = reducedMotion
        ? { duration: 0 }
        : { duration: flapDuration, delay: phase === "closing" ? foldDelay : 0, ease };

    useEffect(() => {
        if (phase === "open" && document.activeElement === triggerRef.current) {
            formRef.current?.querySelector("input")?.focus();
        }
    }, [phase]);

    useEffect(() => {
        if (sendStatus !== "sent" || phase !== "open") return;

        const timer = window.setTimeout(() => {
            if (formRef.current?.contains(document.activeElement)) {
                triggerRef.current?.focus({ preventScroll: true });
            }
            setPhase(reducedMotion ? "closed" : "closing");
        }, 1000);

        return () => window.clearTimeout(timer);
    }, [phase, reducedMotion, sendStatus]);

    const openLetter = () => {
        if (!closed) return;

        triggerRef.current?.focus({ preventScroll: true });
        setSendStatus("idle");
        setPhase(reducedMotion ? "open" : "opening");
    };

    const closeLetter = () => {
        if (!open || formLocked || sendingRef.current) return;

        triggerRef.current?.focus({ preventScroll: true });
        setPhase(reducedMotion ? "closed" : "closing");
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "Escape" || !open || formLocked) return;

        event.preventDefault();
        closeLetter();
    };

    const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
        if (!closed || reducedMotion || event.pointerType !== "mouse") return;

        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - left) / width;
        const y = (event.clientY - top) / height;
        const surface = event.currentTarget.parentElement?.style;
        surface?.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
        surface?.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`);
        surface?.setProperty("--reflection-x", `${27 + x * 32}%`);
        surface?.setProperty("--reflection-y", `${8 + y * 35}%`);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setContact((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!open || formLocked || sendingRef.current) return;

        sendingRef.current = true;
        setSendStatus("sending");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: new FormData(event.currentTarget),
            });
            if (response.ok && (await response.json())?.ok === true) {
                setContact(initialContact);
                setSendStatus("sent");
            } else {
                setSendStatus("error");
            }
        } catch {
            setSendStatus("error");
        } finally {
            sendingRef.current = false;
        }
    };

    return (
        <div ref={contactRef}>
            <SectionTitle title="Contact" />
            <div className={styles.intro}>
                <h2>Let&apos;s talk.</h2>
                <p>Have something in mind? I&apos;d love to hear from you.</p>
            </div>
            <div className={styles.stage} data-phase={phase} onKeyDown={handleKeyDown}>
                <motion.div
                    className={styles.letterSlot}
                    initial={false}
                    animate={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                    transition={letterTransition}
                >
                    <div className={styles.letterTrack}>
                        <motion.div
                            id={letterId}
                            className={styles.letter}
                            initial={false}
                            animate={expanded ? "raised" : "stowed"}
                            variants={{
                                raised: { opacity: 1, y: "0%", scaleX: 1, scaleY: 1 },
                                stowed: { opacity: 0, y: "24%", scaleX: 0.48, scaleY: 0.18 },
                            }}
                            transition={letterTransition}
                            onAnimationComplete={(position) => {
                                if (position === "raised") {
                                    setPhase((current) => current === "opening" ? "open" : current);
                                }
                            }}
                        >
                            <form
                                ref={formRef}
                                className={styles.form}
                                method="post"
                                action="/api/contact"
                                aria-label="Write a message"
                                aria-hidden={!open || undefined}
                                onSubmit={handleSubmit}
                            >
                                <label>
                                    Name
                                    <TextField required fullWidth name="name" autoComplete="name" value={contact.name} readOnly={formLocked} onChange={handleChange} />
                                </label>
                                <label>
                                    Email
                                    <TextField required fullWidth type="email" name="email" autoComplete="email" value={contact.email} readOnly={formLocked} onChange={handleChange} />
                                </label>
                                <label>
                                    Message
                                    <TextArea required fullWidth name="message" rows={2} resize="none" value={contact.message} readOnly={formLocked} onChange={handleChange} />
                                </label>
                                <div className={styles.formFooter}>
                                    <p className={styles.feedback} data-error={sendStatus === "error"} role="status">
                                        {sendStatusText[sendStatus]}
                                    </p>
                                    <Button type="submit" variant="outlined" className={styles.sendButton} aria-disabled={formLocked}>
                                        Send Message
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
                <div className={styles.envelopeSpace}>
                    <div className={`${styles.envelopePlane} ${styles.shell}`} aria-hidden="true" />
                    <div className={`${styles.envelopePlane} ${styles.flapPlane}`} aria-hidden="true">
                        <motion.div
                            className={styles.flap}
                            initial={false}
                            animate={expanded ? "folded" : "sealed"}
                            variants={{ folded: { rotateX: -158 }, sealed: { rotateX: 0 } }}
                            transition={flapTransition}
                            onAnimationComplete={(position) => {
                                if (position === "sealed") {
                                    setPhase((current) => current === "closing" ? "closed" : current);
                                }
                            }}
                        />
                    </div>
                    <div className={`${styles.envelopePlane} ${styles.pocket}`} aria-hidden="true">
                        <div className={styles.pocketMouth} />
                        <div className={styles.bottomFold} />
                    </div>
                    <button
                        ref={triggerRef}
                        type="button"
                        className={styles.envelopeButton}
                        aria-label={open ? "Close message form" : "Write a message"}
                        aria-describedby={canToggle && sendStatus !== "sent" ? hintId : undefined}
                        aria-controls={letterId}
                        aria-expanded={expanded}
                        aria-disabled={!canToggle}
                        tabIndex={canToggle ? 0 : -1}
                        onClick={open ? closeLetter : openLetter}
                        onPointerMove={handlePointerMove}
                        onPointerLeave={resetTilt}
                    />
                </div>
            </div>
            <p className={styles.hint} id={hintId} data-visible={canToggle} data-sent={sendStatus === "sent"}>
                {sendStatus === "sent" ? sendStatusText.sent : open ? "Click the envelope to close." : "Click to write a message."}
            </p>
        </div>
    );
};

export default Contact;
