"use client";
import { ReactNode, createContext, useContext, useState } from 'react';

type LayoutContextProps = {
    children: ReactNode;
};


interface ILayoutContext {
    isSidebarOpen: boolean;
    setisSidebarOpen: (value: boolean) => void;
}

export const LayoutContext = createContext<ILayoutContext | null>(null);

const LayoutContextProvider = ({ children }: LayoutContextProps) => {
    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    return (
        <LayoutContext.Provider value={{
            isSidebarOpen, setisSidebarOpen: (value) => setisSidebarOpen(value)
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export default LayoutContextProvider

export const useLayout = (): ILayoutContext => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutContextProvider');
    }
    return context;
};