import { Image } from "primereact/image";
import React, { useContext } from "react";
import './menuTemplate.scss';
import { IconsContext } from "../../context/restaurant/IconsContext";

const MenuTemplate = ({ logo, categories, font, layout, palette, showImages, showIcons, showDescriptions, showNavigation }) => {
    const { icons } = useContext(IconsContext);
    const getIcon = (iconId) => {
        return icons.find((c) => c.id === iconId);
    }
    
    const { primaryColor, secondaryColor, primaryTextColor, secondaryTextColor } = palette;

    return(
        <div className="menu__container" style={{backgroundColor: secondaryColor}}>
            <div className="menu__navigation">
                {logo && <div className="menu__navigation-logo">
                    <Image src={logo} width="200"/>
                </div>}
                {categories && <div className="menu__navigation-categories">
                    {categories.map((category) => {
                        return (<div className="menu__navigation-category" style={{backgroundColor: primaryColor, color: primaryTextColor}}>
                            {category.name} {showIcons && <span>{getIcon(category.icon).component}</span>}
                        </div>)
                    })}
                </div>}
            </div>
        </div>
    );
}

export { MenuTemplate };