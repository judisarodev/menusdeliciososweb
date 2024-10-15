import { FaHamburger } from "react-icons/fa";
import { FaPizzaSlice } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { GiTacos } from "react-icons/gi";
import React, { createContext, } from 'react';

const IconsContext = createContext(null);

function IconsContextProvider ({ children }) {
    const icons = [{
        name: 'Comida rápida',
        id: 'fast-food',
        component: <IoFastFood />
    }, {
        name: 'Hamburguesa',
        id: 'hamburguer',
        component: <FaHamburger />
    }, {
        name: 'Pizza',
        id: 'pizza',
        component: <FaPizzaSlice />
    }, {
        name: 'Taco',
        id: 'taco',
        component: <GiTacos />
    }
];

    return(
        <IconsContext.Provider value={{ icons }}>
            { children }
        </IconsContext.Provider>
    );
}
export {
    IconsContext,
    IconsContextProvider,
}