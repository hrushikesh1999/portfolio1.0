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

        const { x, y } = position;
        const radius = isSunSet ? moonSize : sunSize;
        if (radius <= 0) return;

        const haloRadius = radius * 2.65;
        const halo = ctx.createRadialGradient(x, y, radius * 0.92, x, y, haloRadius);
        halo.addColorStop(0, isSunSet ? 'rgba(220, 225, 234, 0.28)' : 'rgba(255, 239, 188, 0.32)');
        halo.addColorStop(0.42, isSunSet ? 'rgba(220, 225, 234, 0.12)' : 'rgba(255, 239, 188, 0.14)');
        halo.addColorStop(0.75, isSunSet ? 'rgba(220, 225, 234, 0.03)' : 'rgba(255, 239, 188, 0.04)');
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.fillRect(x - haloRadius, y - haloRadius, haloRadius * 2, haloRadius * 2);

        const surface = ctx.createRadialGradient(
            x - radius * 0.3, y - radius * 0.35, 0,
            x, y, radius
        );
        surface.addColorStop(0, isSunSet ? '#fafaf7' : '#fffef5');
        surface.addColorStop(0.62, isSunSet ? '#e9ebed' : '#fff3c8');
        surface.addColorStop(1, isSunSet ? '#cdd2d8' : '#f5df9d');
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = surface;
        ctx.fill();

        if (isSunSet) {
            for (let i = 0; i < 3; i++) {
                const craterX = x + (Math.random() - 0.5) * radius;
                const craterY = y + (Math.random() - 0.5) * radius;
                const craterSize = 2 + Math.random() * 8;
                const craterOpacity = Math.random() * 0.6;

                ctx.beginPath();
                ctx.arc(craterX, craterY, craterSize, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(0, 0, 0, ${craterOpacity})`;
                ctx.fill();
            }
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
