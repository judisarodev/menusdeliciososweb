import React, { createContext, useEffect, useState,  } from 'react';
const TokenContext = createContext(null);

function TokenContextProvider ({ children }) {
    const [token, setToken] = useState('');
    
    useEffect(() => {
        // Recupera el token de localStorage
        const storedToken = sessionStorage.getItem('token');
        setToken(storedToken);
    }, []);
    
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