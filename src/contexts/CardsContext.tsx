import { createContext, useContext, useState } from "react";

interface CardsContextType {
    totalCards: number;
    setTotalCards: React.Dispatch<React.SetStateAction<number>>;
    doneCards: number;
    setDoneCards: React.Dispatch<React.SetStateAction<number>>;
}

interface CardsProviderProps {
    children: React.ReactNode;
}

const CardsContext = createContext<CardsContextType | null>(null);
export const CardsProvider = ({ children }:CardsProviderProps) => {
    const [totalCards, setTotalCards] = useState<number>(0);
    const [doneCards, setDoneCards] = useState<number>(0);

    return (
        <CardsContext.Provider  value={{ totalCards, setTotalCards, doneCards, setDoneCards}}>
            {children}
        </CardsContext.Provider>
    )
}

export const useCards = (): CardsContextType => {
    const context = useContext(CardsContext);
    if (!context) {
        throw new Error("useCards must be used within a CardsProvider");
        
    }
    return context
}