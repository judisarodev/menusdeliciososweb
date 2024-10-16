import React, { useContext, useEffect, useState } from "react";
import './emulator.scss';
import { FastFood } from "../../templates/fast-food/FastFood";
import { MenuContext } from "../../context/restaurant/MenuContext";
import { MenuTemplate } from './../menu/MenuTemplate';

const Emulator = () => {

    const menuContext = useContext(MenuContext);
    const { menu } =  menuContext; 

    const [categories, setCategories] = useState([]);
    const [logo, setLogo] = useState();
    const [showIcons, setShowIcons] = useState();
    const [showNavigation, setShowNavigation] = useState();
    const [categoriesAndDishes, setCategoriesAndDishes] = useState([]);
    const [showDescriptions, setShowDescriptions] = useState();
    const [palette, setPalette] = useState({
        primaryColor: '#000000',
        secondaryColor: '#FFFFFF',
        primaryTextColor: '#FFFFFF',
        secondaryTextColor: '#000000',
    });

    useEffect(() => {
        if (menu && menu.categories) {
            setCategories(menu.categories.map((category) => {
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                    icon: category.icon
                }
            }));
            setLogo(menu.logo);
            setShowIcons(menu.showIcons);
            setPalette(menu.palette);
            setCategoriesAndDishes(menu.categories);
            setShowNavigation(menu.showNavigation);
            setShowDescriptions(menu.showDescription);
        }
    }, [menu]);


    return (
        <div className="emulator__container">
            <MenuTemplate
            logo={logo}
            categories={categories}
            showIcons={showIcons}
            palette={palette}
            showNavigation={showNavigation}
            categoriesAndDishes={categoriesAndDishes}
            showDescriptions={showDescriptions}/>
        </div>
    );
}

export { Emulator }; 