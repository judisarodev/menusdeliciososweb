import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import './menuSettings.scss';
import { InputSwitch } from 'primereact/inputswitch';
import { MenuContext } from "../../context/restaurant/MenuContext";
import { TokenContext } from "../../context/token/TokenContextProvider";

const MenuSettings = () => {
    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    const menuContext = useContext(MenuContext);
    const { menu, getMenu, menuId, layouts, fonts } = menuContext;
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const [font, setFont] = useState();
    const [layout, setLayout] = useState();
    const [palette, setPalette] = useState();
    const [palettes, setPalettes] = useState();
    const [showDescription, setShowDescription] = useState();
    const [showIcons, setShowIcons] = useState();
    const [showImages, setShowImages] = useState();
    const [showNavigation, setShowNavigation] = useState();

    async function updateMenu(object){
        return await fetch(BASE_URL + '/menu/update/' + menuId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(object),
        }).then((response) => {
            if(response.ok){
                return true;
            }
            return false;
        });
    }

    useEffect(() => {
        setPalette(menu.palette);
        setLayout({ name: menu.layout || 'linearito' });
        setFont({ name: menu.font || 'Sans Serif' });    
        setShowDescription(menu.showDescription);
        setShowIcons(menu.showIcons);
        setShowNavigation(menu.showNavigation);
        setShowImages(menu.showImage);
    }, [menu]);

    const selectedPaletteTemplate = (option) => {
        if(option){
            return (<>
                <div className="menu-settings__palette-container">
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.primaryColor }}></div>
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.secondaryColor }}></div>
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.primaryTextColor }}></div>
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.secondaryTextColor }}></div>
                </div></>
            );
        }
    }

    const paletteTemplate = (option, props) => {
        if (option) {
            return (
                <div className="menu-settings__palette-container">
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.primaryColor }}></div>
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.secondaryColor }}></div>
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.primaryTextColor }}></div>
                    <div className="menu-settings__palette-item" style={{ backgroundColor: option.secondaryTextColor }}></div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    }


    const selectedFontTemplate = (option) => {
        if(option){
            return (
                <div style={{ fontFamily: option.name }}>
                    { option.name }
                </div>
            );
        }
        return <span>Selecciona una fuente</span>; // Mensaje alternativo
    }

    const fontTemplate = (option, props) => {
        if (!option) {
            return <span>Selecciona una fuente</span>; // Mensaje alternativo
        }
        
        return (
            <div style={{ fontFamily: option.name }}>
                { option.name }
            </div>
        );
    }

    useEffect(() => {
        fetch(BASE_URL + '/menu/get-palettes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error('No fue posible consultar las paletas de colores');
        }).then((data) => {
            setPalettes(data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (<div className="menu-settings__container">
        <form className="dish-form__container">
            <div>
                <p className="dish-form__title">Configuración</p>
            </div>

            <div className="dish-form__input-container">
                <label>Fuente</label>
                <Dropdown
                    value={font}
                    options={fonts}
                    optionLabel="name"
                    onChange={async (e) => {
                        const response = await updateMenu({ font: e.value.name });
                        if(response){
                            getMenu();
                        }
                    }}
                    valueTemplate={selectedFontTemplate}
                    itemTemplate={fontTemplate}
                    placeholder="Selecciona la fuente"
                />
            </div>

            <div className="dish-form__input-container">
                <label>Plantilla</label>
                <Dropdown
                    value={layout}
                    options={layouts}
                    optionLabel="name"
                    onChange={async (e) => {
                        const response = await updateMenu({ layout: e.value.name });
                        if(response){
                            getMenu();
                        }
                    }}
                    placeholder="Selecciona la plantilla"
                />
            </div>

            <div className="dish-form__input-container">
                <label>Paleta de colores</label>
                {palette && <Dropdown
                    value={palette}
                    options={palettes}
                    onChange={async (e) => {
                        const response = await updateMenu({ paletteId: e.value.paletteId });
                        if(response){
                            getMenu();
                        }
                    }}
                    valueTemplate={selectedPaletteTemplate}
                    itemTemplate={paletteTemplate}
                    placeholder="Selecciona la paleta de colores"
                />}
            </div>

            <div className="menu-settings__switch-contaier">
                <div>
                    <label>Imágenes</label>
                    <InputSwitch
                        checked={showImages}
                        onChange={async (e) => {
                            const response = await updateMenu({ showImages: e.value });
                            if(response){
                                getMenu();
                            }
                        }} />
                </div>

                <div>
                    <label>Iconos</label>
                    <InputSwitch
                        checked={showIcons}
                        onChange={async (e) => {
                            const response = await updateMenu({ showIcons: e.value });
                            if(response){
                                getMenu();
                            }
                        }} />
                </div>

                <div>
                    <label>Descripciones</label>
                    <InputSwitch
                        checked={showDescription}
                        onChange={async (e) => {
                            const response = await updateMenu({ showDescription: e.value });
                            if(response){
                                getMenu();
                            }
                        }} />
                </div>

                <div>
                    <label>Menú de navegación</label>
                    <InputSwitch
                        checked={showNavigation}
                        onChange={async (e) => {
                            const response = await updateMenu({ showNavigation: e.value });
                            if(response){
                                getMenu();
                            }
                        }} />
                </div>
            </div>

        </form>
    </div>);
}

export { MenuSettings };