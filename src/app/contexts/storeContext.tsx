import { PropsWithChildren, createContext, useContext, useState } from "react";
import { basket } from "../models/basket";

interface StoreContextClass {
currentBasket: basket | null;
basketCount: number;
basketTotal: number;
setBasket: (basket: basket) => void;
removeBasket: () => void;
decrementBasketQuantity: (ProductId: number, quantity?: number) => void;
}

export const StoreContext = createContext<StoreContextClass | undefined>(undefined);

//Create a custom hook

export function useStoreContext() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error(`Error detected! You are not inside of the provider required 
        to access an/or use this context.`);
    }
    return context;
}

//Create a provider
export function StoreProvider({children}: PropsWithChildren<any>) {
    const [currentBasket, setBasket] = useState<basket | null>(null);
    const basketCount = currentBasket?.contents.reduce((accumulatedCount, item) => accumulatedCount + item.quantity, 0) ?? 0;
    const basketTotal = currentBasket?.contents.reduce((accumulatedTotal, item) => accumulatedTotal + (item.quantity * item.unitPrice), 0) ?? 0.00;
    
    function removeBasket() {
        setBasket(null);
    }


    function decrementBasketQuantity(ProductId: number, quantity: number = 1) {
        if (!currentBasket) return;
        const contents = [...currentBasket.contents];
        const itemIndex = contents.findIndex((x) => x.id === ProductId);
        if (itemIndex === -1) return;
        if (contents[itemIndex].quantity > quantity) {
            contents[itemIndex].quantity -= quantity;
        } 
        else {
            contents.splice(itemIndex, 1);
        }
        setBasket({ ...currentBasket, contents });
    }
    
    return (
        <StoreContext.Provider value={{currentBasket, basketCount, basketTotal, setBasket, removeBasket, decrementBasketQuantity}}>
            {children}
        </StoreContext.Provider>
    );
}