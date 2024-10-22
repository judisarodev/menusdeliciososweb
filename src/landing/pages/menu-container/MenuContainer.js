import React, { useState } from "react";
import { MenuTemplate } from "../../../backoffice/components/menu/MenuTemplate";
import { useParams } from "react-router-dom";

const MenuContainer = () => {
    const { url } = useParams();
    const BASE_URL = process.env.REACT_APP_URL;

    const [menu, setMenu] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useState(() => {
        fetch(BASE_URL + '/client/get-menu/' + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error al consultar el menú');
        }).then((data) => {
            console.log(data);
            setMenu(data);
        }).catch((error) => {
            setShowErrorMessage(true);
            console.error(error);
        });
    }, []);

    return (<>
        {menu && <MenuTemplate
            logo={menu.logo}
            categories={menu.categories}
            showIcons={menu.showIcons}
            palette={menu.palette}
            showNavigation={menu.showNavigation}
            categoriesAndDishes={menu.categoriesAndDishes}
            showDescriptions={menu.showDescriptions}
            layout={menu.layout}
            backgroundImage={menu.backgroundImage} />}

        { showErrorMessage && 
            <p>Ha ocurrido un error</p>
        }
    </>);
}

export { MenuContainer };