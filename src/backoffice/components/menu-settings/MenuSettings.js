import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import './menuSettings.scss';
import { InputSwitch } from 'primereact/inputswitch';
import { MenuContext } from "../../context/restaurant/MenuContext";

const MenuSettings = () => {
    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    const menuContext = useContext(MenuContext);
    const { menu } = menuContext;

    const layouts = [{
        name: 'Linear',
        value: 'linear',
    }, {
        name: 'Grilla',
        value: 'grid',
    }];

    const fonts = [{
        name: 'Sans Serif',
        value: 'sans-serif',
    }, {
        name: 'Verdana',
        value: 'verdana',
    }];

    const [font, setFont] = useState(menu.font);
    const [layout, setLayout] = useState(menu.layout);
    const [palette, setPalette] = useState();
    const [palettes, setPalettes] = useState();
    const [showDescriptions, setShowDescriptions] = useState(menu.showDescription);
    const [showIcons, setShowIcons] = useState(menu.showIcons);
    const [showImages, setShowImages] = useState(menu.showNavigation);
    const [showNavigation, setShowNavigation] = useState(menu.showNavigation);

    useEffect(() => {
        setPalette(menu.palette);
    }, [menu]);

    const selectedPaletteTemplate = (option) => {
        return (
            <div className="menu-settings__palette-container">
                <div className="menu-settings__palette-item" style={{ backgroundColor: option.primaryColor }}></div>
                <div className="menu-settings__palette-item" style={{ backgroundColor: option.secondaryColor }}></div>
                <div className="menu-settings__palette-item" style={{ backgroundColor: option.primaryTextColor }}></div>
                <div className="menu-settings__palette-item" style={{ backgroundColor: option.secondaryTextColor }}></div>
            </div>
        );
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
                    onChange={(e) => {
                        setFont(e.value);
                    }}
                    placeholder="Selecciona la fuente"
                />
            </div>

            <div className="dish-form__input-container">
                <label>Plantilla</label>
                <Dropdown
                    value={layout}
                    options={layouts}
                    optionLabel="name"
                    onChange={(e) => {
                        setLayout(e.value);
                    }}
                    placeholder="Selecciona la plantilla"
                />
            </div>

            <div className="dish-form__input-container">
                <label>Paleta de colores</label>
                {palette && <Dropdown
                    value={palette}
                    options={palettes}
                    onChange={(e) => {
                        setPalette(e.value);
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
                        onChange={(e) => setShowImages(e.value)} />
                </div>

                <div>
                    <label>Iconos</label>
                    <InputSwitch
                        checked={showIcons}
                        onChange={(e) => setShowIcons(e.value)} />
                </div>

                <div>
                    <label>Descripciones</label>
                    <InputSwitch
                        checked={showDescriptions}
                        onChange={(e) => setShowDescriptions(e.value)} />
                </div>

                <div>
                    <label>Menú de navegación</label>
                    <InputSwitch
                        checked={showNavigation}
                        onChange={(e) => setShowNavigation(e.value)} />
                </div>
            </div>

        </form>
    </div>);
}

export { MenuSettings };