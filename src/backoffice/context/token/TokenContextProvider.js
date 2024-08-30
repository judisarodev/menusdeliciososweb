import React, { createContext, useState,  } from 'react';
const TokenContext = createContext(null);

function TokenContextProvider ({ children }) {
    const [token, setToken] = useState('');
    return(
        <TokenContext.Provider value={{ token, setToken }}>
            { children }
        </TokenContext.Provider>
    );
}

export {
    TokenContext,
    TokenContextProvider,
}