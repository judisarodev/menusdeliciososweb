import React, { createContext, useState,  } from 'react';
const ProductsContext = createContext(null);

function ProductsContextProvider ({ children }) {
    const [products, setProducts] = useState('');
    return(
        <ProductsContext.Provider value={{ products, setProducts }}>
            { children }
        </ProductsContext.Provider>
    );
}
export {
    ProductsContext,
    ProductsContextProvider,
}