import ThemeContextProvider from "@/context/ThemeContext";
import LayoutContextProvider from "@/context/LayoutContext";
import ScrollContextProvider from "@/context/ScrollContext";

type StoreProviderProps = {
    children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
    return (
        <>
            <ThemeContextProvider>
                <LayoutContextProvider>
                    <ScrollContextProvider>
                        {children}
                    </ScrollContextProvider>
                </LayoutContextProvider>
            </ThemeContextProvider>
        </>
    );
};

export default StoreProvider;
