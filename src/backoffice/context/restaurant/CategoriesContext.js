import React, { createContext, useState,  } from 'react';
const CategoriesContext = createContext(null);

function CategoriesContextProvider ({ children }) {
    const [categories, setCategories] = useState('');
    return(
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            { children }
        </CategoriesContext.Provider>
    );
}
export {
    CategoriesContext,
    CategoriesContextProvider,
}