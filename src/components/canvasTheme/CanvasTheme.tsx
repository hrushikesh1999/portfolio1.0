"use client";
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import styles from "./canvasTheme.module.css"

const CanvasTheme = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDragging, setDragging] = useState(false);
    const maxHeight = 150
    const {
        position, setPosition,
        sunSize, setSunSize,
        moonSize, setMoonSize,
        isSunSet, setIsSunSet
    } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!(canvas && position)) return
        const ctx = canvas.getContext('2d');
        if (!ctx) return
        // Ensure canvas size matches the window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const drawSun = () => {
            // Clear the entire canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the sun with a natural evening glow effect
            const gradient = ctx.createRadialGradient(
                position.x,
                position.y,
                5,
                position.x,
                position.y,
                sunSize
            );
            gradient.addColorStop(0, 'rgba(255, 165, 0, 1)'); // Sun color
            gradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.7)'); // Transparent glow
            gradient.addColorStop(1, 'rgba(255, 165, 0, 0)'); // Fully transparent

            ctx.beginPath();
            ctx.arc(position.x, position.y, sunSize, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255, 165, 0, 0.7)'; // Glow color
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fill();
            ctx.closePath();
        };

        const drawMoon = () => {
            if (isSunSet && moonSize > 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw moon with craters
                ctx.beginPath();
                ctx.arc(position.x, position.y, moonSize, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // White fill for the moon
                ctx.fill();
                ctx.closePath();

                // Add craters by drawing smaller circles within the moon's diameter
                const numCraters = 3;
                const minCraterSize = 2;
                const maxCraterSize = 10;

                for (let i = 0; i < numCraters; i++) {
                    const craterX = position.x + (Math.random() - 0.5) * moonSize; // Random X within moon's diameter
                    const craterY = position.y + (Math.random() - 0.5) * moonSize; // Random Y within moon's diameter
                    const craterSize = Math.random() * (maxCraterSize - minCraterSize) + minCraterSize;
                    const craterOpacity = Math.random() * 0.6; // Varying opacities

                    ctx.beginPath();
                    ctx.arc(craterX, craterY, craterSize, 0, 2 * Math.PI);
                    ctx.fillStyle = `rgba(0, 0, 0, ${craterOpacity})`; // Black color for craters
                    ctx.fill();
                    ctx.closePath();
                }
            }
        };

        if (isSunSet) {
            drawMoon()
        } else {
            drawSun();
        }
    }, [canvasRef, position, sunSize, isSunSet, moonSize]);

    useEffect(() => {
        const handleMouseDown = (e: any) => {
            if (checkIfClickIsInside(e)) {
                setDragging(true);
                const initialY = Math.max(0, Math.min(e.clientY, maxHeight - sunSize));
                setPosition({
                    x: e.clientX,
                    y: initialY,
                });
            }
        };

        const handleMouseMove = (e: any) => {
            if (isDragging && position) {
                const offsetX = e.clientX - position.x;
                const offsetY = e.clientY - position.y;

                // Limit dragging horizontally
                const newX = Math.max(0, Math.min(position.x + offsetX, window.innerWidth));

                // Limit dragging vertically up to maxHeight taking into account the sun's size
                const newY = Math.max(0, Math.min(position.y + offsetY, maxHeight - sunSize));

                setPosition({
                    x: newX,
                    y: newY,
                });
            }
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        const handleWheel = (e: any) => {
            const mouseY = e.clientY;

            // Check if the mouse is within the canvas height (maxHeight)
            if (mouseY >= 0 && mouseY <= maxHeight) {
                e.preventDefault();

                if (isSunSet) {
                    const newMoonSize = Math.max(10, Math.min(moonSize - e.deltaY / 30, 80));
                    setMoonSize(newMoonSize);
                    if (newMoonSize === 10) {
                        setIsSunSet(false);
                    } else {
                        setIsSunSet(true);
                    }
                } else {
                    const newSunSize = Math.max(10, Math.min(sunSize + e.deltaY / 30, 80));
                    setSunSize(newSunSize);
                    if (newSunSize === 10) {
                        setIsSunSet(true);
                    } else {
                        setIsSunSet(false);
                    }
                }
            }
        };

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener('wheel', handleWheel, { passive: false });
        canvas.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            canvas.removeEventListener("wheel", handleWheel);
            canvas.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDragging, position, sunSize, isSunSet, moonSize])

    function checkIfClickIsInside(e: any) {
        const canvas = canvasRef.current;
        if (!(canvas && position)) return
        const rect = canvas.getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;

        const buffer = 10; // Adjust the buffer size as needed

        const sunClicked = (
            canvasX >= position.x - sunSize - buffer &&
            canvasX <= position.x + sunSize + buffer &&
            canvasY >= position.y - sunSize - buffer &&
            canvasY <= position.y + sunSize + buffer
        );

        const moonClicked = isSunSet && (
            canvasX >= position.x - moonSize - buffer &&
            canvasX <= position.x + moonSize + buffer &&
            canvasY >= position.y - moonSize - buffer &&
            canvasY <= position.y + moonSize + buffer
        );
        return sunClicked || moonClicked
    }

    const toggleDayNight = (e: any) => {
        if (checkIfClickIsInside(e)) {
            setIsSunSet(!isSunSet);
            if (isSunSet) {
                setSunSize(moonSize)
                setMoonSize(10)
            }
            else {
                setMoonSize(sunSize)
                setSunSize(10)
            }
        }
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                onDoubleClick={(e) => toggleDayNight(e)}
                className={styles.canvastheme}
            />
        </>
    );
}

export default CanvasTheme