"use client";
import { useTheme } from "@/context/ThemeContext";
import styles from "./themeProvider.module.css"

type Color = readonly [number, number, number];

const twilight = [[157, 126, 133], [131, 108, 127], [108, 95, 117]] as const;
const daylight = [[255, 243, 214], [200, 220, 239], [216, 205, 235]] as const;
const sunset = [[246, 219, 203], [226, 174, 188], [201, 142, 162]] as const;

function blendColor(from: Color, to: Color, amount: number) {
    const channels = from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
    return `rgb(${channels.join(", ")})`;
}

const ThemeProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const {
        position,
        sunSize,
        moonSize,
        isSunSet
    } = useTheme()

    const intensity = Math.max(0, Math.min(1, (sunSize - 10) / 50));
    const sky = twilight.map((color, index) => {
        if (intensity < 0.5) return blendColor(color, sunset[index], intensity * 2);
        return blendColor(sunset[index], daylight[index], (intensity - 0.5) * 2);
    });

    const origin = position ? `${position.x}px ${position.y}px` : "right 30px top 30px";
    const reach = `clamp(10rem, ${22 + intensity * 28}vmax, 48rem)`;
    const tint = "255, 246, 210";
    const glow = intensity * 0.95;
    const heroTint = intensity * 0.84;
    const dayBackground = [
        `radial-gradient(circle ${reach} at ${origin}, rgba(${tint}, ${glow}), rgba(${tint}, ${glow * 0.55}) 32%, rgba(${tint}, ${glow * 0.12}) 65%, rgba(${tint}, 0))`,
        `linear-gradient(to bottom,
            rgba(90, 159, 205, ${heroTint}) 0,
            rgba(128, 189, 222, ${heroTint * 0.96}) 26vh,
            rgba(170, 201, 232, ${heroTint * 0.84}) 48vh,
            rgba(206, 188, 228, ${heroTint * 0.72}) 68vh,
            rgba(243, 190, 172, ${heroTint * 0.60}) 90vh,
            rgba(243, 190, 172, ${heroTint * 0.43}) calc(105vh + 3rem),
            rgba(243, 190, 172, ${heroTint * 0.22}) calc(120vh + 5rem),
            rgba(243, 190, 172, ${heroTint * 0.07}) calc(135vh + 7rem),
            rgba(243, 190, 172, 0) calc(150vh + 9rem))`,
        `linear-gradient(155deg, ${sky[0]}, ${sky[1]} 48%, ${sky[2]})`,
    ].join(", ");
    const background = isSunSet
        ? `radial-gradient(circle at ${origin}, rgb(33, 33, 33), rgba(0, 0, 0, ${moonSize / 60}))`
        : dayBackground;

    return (
        <div style={{ background }} className={`${styles.themecontainer} ${isSunSet ? styles['theme-dark'] : styles['theme-light']}`}>
            {children}
        </div>
    )
}

export default ThemeProvider
