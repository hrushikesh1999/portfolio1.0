"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useInView } from "motion/react";
import CancelIcon from "@/assets/icons/CancelIcon";
import { useScroll } from "@/context/ScrollContext";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Button from "@/ui/button/Button";
import skillList from "./skillList";
import SkillTile from "./SkillTile";
import styles from "./skills.module.css";

const normalizeSkillName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const searchPlaceholder = "Looking for a specific skill I've worked with? Search here...";
const entranceStagger = 0.016;

const Skills = () => {
    const { skillsRef } = useScroll();
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const inView = useInView(skillsRef, { once: true, margin: "0px 0px -8% 0px" });
    const isSearching = query.trim().length > 0;
    const searchTerm = normalizeSkillName(query);
    const matchingSkills = isSearching
        ? skillList.filter(({ name }) => searchTerm.length > 0 && normalizeSkillName(name).includes(searchTerm))
        : skillList;
    const hasResults = matchingSkills.length > 0;
    const tilesVisible = inView || hasSearched || prefersReducedMotion;

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setPrefersReducedMotion(preference.matches);
        updatePreference();
        preference.addEventListener("change", updatePreference);
        return () => preference.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
        const focusSearch = (event: KeyboardEvent) => {
            if (
                event.defaultPrevented || event.isComposing || event.altKey || event.shiftKey ||
                !(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k"
            ) return;

            const input = inputRef.current;
            const target = event.target;
            if (!input) return;
            if (
                target !== input && target instanceof HTMLElement &&
                (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']"))
            ) return;

            event.preventDefault();
            input.focus();
        };

        window.addEventListener("keydown", focusSearch);
        return () => window.removeEventListener("keydown", focusSearch);
    }, []);

    const clearSearch = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    const updateQuery = (value: string) => {
        if (value.trim()) setHasSearched(true);
        setQuery(value);
    };

    return (
        <div ref={skillsRef}>
            <SectionTitle title="Skills" />
            <div className={styles.skillLayout}>
                <div className={styles.searchBar} role="search" aria-label="Skills">
                    <span className={styles.searchIcon} aria-hidden="true" />
                    <div className={styles.searchField}>
                        <input
                            ref={inputRef}
                            className={styles.searchInput}
                            type="search"
                            aria-label="Search skills"
                            aria-keyshortcuts="Control+K Meta+K"
                            autoComplete="off"
                            placeholder={searchPlaceholder}
                            value={query}
                            onChange={(event) => updateQuery(event.target.value)}
                        />
                        <span className={styles.searchPlaceholder} aria-hidden="true">{searchPlaceholder}</span>
                    </div>
                    {query && (
                        <Button type="button" className={styles.clearButton} onClick={clearSearch} aria-label="Clear search">
                            <span className={styles.clearIcon} aria-hidden="true">
                                <CancelIcon width="14" height="14" />
                            </span>
                        </Button>
                    )}
                </div>
                <p role="status" className={isSearching && !hasResults ? styles.emptyState : styles.screenReaderOnly}>
                    {isSearching && (hasResults
                        ? `${matchingSkills.length} ${matchingSkills.length === 1 ? "skill" : "skills"} found.`
                        : "No skills match your search.")}
                </p>
                <ul
                    className={styles.skillGrid}
                    role="list"
                    aria-label="Skills"
                    aria-hidden={!hasResults || undefined}
                    data-empty={!hasResults || undefined}
                >
                    <AnimatePresence mode={prefersReducedMotion ? "sync" : "popLayout"}>
                        {matchingSkills.map((skill, index) => (
                            <SkillTile
                                key={skill.name}
                                {...skill}
                                visible={tilesVisible}
                                reducedMotion={prefersReducedMotion}
                                entranceDelay={hasSearched ? undefined : index * entranceStagger}
                            />
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
        </div>
    );
};

export default Skills;
