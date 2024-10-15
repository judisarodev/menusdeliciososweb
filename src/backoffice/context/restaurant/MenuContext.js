import React, { createContext, useState,  } from 'react';
const MenuContext = createContext(null);

function MenuContextProvider ({ children }) {
    const [menu, setMenu] = useState([]);
    return(
        <MenuContext.Provider value={{ menu, setMenu }}>
            { children }
        </MenuContext.Provider>
    );
}
export {
    MenuContext,
    MenuContextProvider,
}