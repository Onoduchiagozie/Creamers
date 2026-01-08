import React, { createContext, useContext, useState } from "react";

const SharedElementContext = createContext(null);

export function SharedElementProvider({ children }) {
    const [shared, setShared] = useState(null);

    return (
        <SharedElementContext.Provider value={{ shared, setShared }}>
            {children}
        </SharedElementContext.Provider>
    );
}

export function useSharedElement() {
    return useContext(SharedElementContext);
}
