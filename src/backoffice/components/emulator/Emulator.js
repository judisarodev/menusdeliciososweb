import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/restaurant/MenuContext";
import { MenuTemplate } from './../menu/MenuTemplate';
import './emulator.scss';

const Emulator = () => {

    const menuContext = useContext(MenuContext);
    const { menu } =  menuContext; 

    const [categories, setCategories] = useState([]);
    const [logo, setLogo] = useState();
    const [showIcons, setShowIcons] = useState();
    const [showNavigation, setShowNavigation] = useState();
    const [categoriesAndDishes, setCategoriesAndDishes] = useState([]);
    const [showDescriptions, setShowDescriptions] = useState();
    const [layout, setLayout]  = useState('Lista');
    const [backgroundImage, setBackgroundImage] = useState();
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
            setLayout(menu.layout);
            setBackgroundImage(menu.backgroundImage);
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
            showDescriptions={showDescriptions}
            layout={layout}
            backgroundImage={backgroundImage}/>
        </div>
    );
}

export { Emulator }; 