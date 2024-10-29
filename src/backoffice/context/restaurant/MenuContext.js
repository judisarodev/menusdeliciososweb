import React, { createContext, useContext, useEffect, useState,  } from 'react';
import { TokenContext } from '../token/TokenContextProvider';
const MenuContext = createContext(null);

function MenuContextProvider ({ children }) {
    // Env
    const BASE_URL = process.env.REACT_APP_URL;
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const [menu, setMenu] = useState([]);
    const [menuId, setMenuId] = useState([]);

    const [countries, setCountries] = useState([]);
    const [restaurantTypes, setRestaurantTypes] = useState([]);

    const [restaurant, setRestaurant] = useState({});

    const layouts = [ {
        name: 'Grilla'
    }, {
        name: 'Lista'
    }];

    const fonts = [{
        name: 'Elegancia Clásica',
    }, {
        name: 'Energía Urbana',
    }, {
        name: 'Calidez Artesanal',
    }, {
        name: 'Dulzura Sofisticada',
    }, {
        name: 'Estilo Nocturno',
    }];

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

    useEffect(() => {
        const getCountries = () => {
            fetch(BASE_URL + '/country/get-all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Error al consultar los países');
            }).then((c) => {
                setCountries(c);
            });
        }
    
        const getTypes = () => {
            fetch(BASE_URL + '/restaurant-type/get-all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Error al consultar los tipos de restaurante');
            }).then((c) => {
                setRestaurantTypes(c);
            });
        }

        getTypes();
        getCountries();
    }, [BASE_URL]);


    return(
        <MenuContext.Provider value={{ menu, setMenu, menuId, setMenuId, getMenu, layouts, fonts, restaurant, setRestaurant, countries, restaurantTypes }}>
            { children }
        </MenuContext.Provider>
    );
}
export {
    MenuContext,
    MenuContextProvider,
}