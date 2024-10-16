import { Image } from "primereact/image";
import React, { useContext, useState } from "react";
import './menuTemplate.scss';
import { IconsContext } from "../../context/restaurant/IconsContext";
import { FaHome } from "react-icons/fa";
import { Button } from 'primereact/button';
import { formatCurrency } from "../../../utils/currency/formatCurrency";

const MenuTemplate = ({ logo, categoriesAndDishes, categories, font, layout, palette, showImages, showIcons, showDescriptions, showNavigation }) => {
    const { icons } = useContext(IconsContext);
    const getIcon = (iconId) => {
        return icons.find((c) => c.id === iconId);
    }

    const [showNavigationView, setShowNavigationView] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { primaryColor, secondaryColor, primaryTextColor, secondaryTextColor } = palette;

    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    return (
        <div className="menu__container" style={{ backgroundColor: 'white' }}>
            <Button
                style={{ backgroundColor: primaryColor }}
                className="menu-template__home-button"
                icon={<FaHome />}
                onClick={() => setShowNavigationView(true)}
            />
            {showNavigation && showNavigationView && <div className="menu__navigation">
                {logo && <div className="menu__navigation-logo">
                    <Image src={logo} width="200" />
                </div>}
                {categories && <div className="menu__navigation-categories">
                    {categories.map((category) => {
                        return (
                            <Button
                                style={{ backgroundColor: primaryColor, color: primaryTextColor }}
                                className="menu__navigation-category"
                                icon={showIcons ? getIcon(category.icon).component : null}
                                label={category.name}
                                onClick={() => {
                                    setSelectedCategory(categoriesAndDishes.find((c) => c.name === category.name));
                                    setShowNavigationView(false);
                                }}
                            />)
                    })}
                </div>}
            </div>}
            {!showNavigationView && <div className="menu-template-category__container">
                <div className="menu-template-category__info">
                    {categoriesAndDishes && (<div>
                        <div className="menu-template-category__title">
                            <div className="menu-template-category__name">
                                <p>{selectedCategory.name}</p>
                            </div>
                            {showIcons && <div className="menu-template-category__icon">
                                <i>{getIcon(selectedCategory.icon).component}</i>
                            </div>}
                        </div>
                        {selectedCategory.dishes && selectedCategory.dishes.map((dish) => {
                            return (<div className="menu-template-item__container">
                                <div className="menu-template-item__summary">
                                    <div className="menu-template-item__name">
                                        <p>{dish.name}</p>
                                    </div>

                                    <div className="menu-template-item__divider"></div>

                                    <div className="menu-template-item__price">
                                        <p>${formatCurrency(dish.price)}</p>
                                    </div>
                                </div>
                                {showDescriptions && <div className="menu-template-item__description">
                                    <p>{dish.description}</p>
                                </div>}
                                <div className="menu-template-item__image">
                                    <Image src={BASE_URL + dish.image.url} width="200" />
                                </div>
                            </div>);
                        })}
                    </div>)}
                </div>
            </div>}
        </div>
    );
}

export { MenuTemplate };