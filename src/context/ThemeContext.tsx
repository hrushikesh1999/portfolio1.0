"use client";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useLayoutEffect, useState } from 'react';

type ThemeContextProps = {
    children: ReactNode;
};

type Position = { x: number, y: number }

interface IThemeContext {
    position: Position | null;
    setPosition: (pos: Position) => void;
    sunSize: number;
    setSunSize: Dispatch<SetStateAction<number>>;
    moonSize: number;
    setMoonSize: Dispatch<SetStateAction<number>>;
    isSunSet: boolean;
    setIsSunSet: (value: boolean) => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

const ThemeContextProvider = ({ children }: ThemeContextProps) => {
    const [position, setPosition] = useState<Position | null>(null);
    const [sunSize, setSunSize] = useState(60);
    const [moonSize, setMoonSize] = useState(10);
    const [isSunSet, setIsSunSet] = useState(false)

    useLayoutEffect(() => {
        // Check if window is defined before accessing its properties
        if (typeof window !== 'undefined') {
            setPosition({ x: window.innerWidth - 30, y: 30 });
        }
    }, []);

    return (
        <ThemeContext.Provider value={{
            position, setPosition: (pos) => setPosition(pos),
            sunSize, setSunSize,
            moonSize, setMoonSize,
            isSunSet, setIsSunSet: (value) => setIsSunSet(value)
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider

export const useTheme = (): IThemeContext => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeContextProvider');
    }
    return context;
};