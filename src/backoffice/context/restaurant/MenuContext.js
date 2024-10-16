import React, { createContext, useContext, useState,  } from 'react';
import { TokenContext } from '../token/TokenContextProvider';
const MenuContext = createContext(null);

function MenuContextProvider ({ children }) {
    // Env
    const BASE_URL = process.env.REACT_APP_URL;
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const [menu, setMenu] = useState([]);
    const [menuId, setMenuId] = useState([]);

    const getMenu = () => {
        fetch(BASE_URL + '/menu/get/' + menuId, {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
        }).then((data) => {
            setMenu(data);
        }).catch(() => {
            console.log('error en el contexto de menú');
        });
    }

    return(
        <MenuContext.Provider value={{ menu, setMenu, menuId, setMenuId, getMenu }}>
            { children }
        </MenuContext.Provider>
    );
}
export {
    MenuContext,
    MenuContextProvider,
}