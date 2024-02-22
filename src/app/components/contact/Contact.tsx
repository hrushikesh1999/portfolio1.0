"use client"
import { useScroll } from "@/context/ScrollContext";
import styles from "./contact.module.css"
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import LocationMap from "./LocationMap";
import TextField from "@/ui/textField/TextField";
import TextArea from "@/ui/textArea/TextArea";
import Button from "@/ui/button/Button";
import { ContactInfo } from "@/types/contact";
import { useState } from "react";

const initialContact: ContactInfo = {
    name: "",
    email: "",
    message: "",
};

const Contact = () => {
    const [contact, setContact] = useState(initialContact);
    let { name, email, message } = contact;
    const { contactRef } = useScroll();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let { name, value } = e.target;
        setContact((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div ref={contactRef} className={styles.contact}>
            <SectionTitle title="Contact" />
            <div className={styles.mapcontainer}>
                <LocationMap />
                <div className={styles.contactcontainer}>
                    <form method="POST" action={process.env.POST_EMAIL}>
                        <div className={styles.contactformtitle}><p>Get In Touch</p></div>
                        <div>
                            <TextField required placeholder="Name" fullWidth name="name" value={name} onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <TextField required placeholder="Email" type="email" fullWidth name="email" value={email} onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <TextArea required placeholder="Message" rows={4} fullWidth resize="none" name="message" value={message} onChange={(e) => handleChange(e)} />
                        </div>
                        <Button type="submit" variant="outlined">Send Message</Button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Contact