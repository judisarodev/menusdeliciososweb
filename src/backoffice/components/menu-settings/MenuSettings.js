import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import './menuSettings.scss';
import { InputSwitch } from 'primereact/inputswitch';

const MenuSettings = () => {

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

    const palettes = [{
        primaryColor: '#F5F5F5',
        secondaryColor: 'red',
        primaryTextColor: '#F5F5F5',
        secondaryTextColor: 'red'
    }, {
        primaryColor: 'red',
        secondaryColor: '#F5F5F5',
        primaryTextColor: 'red',
        secondaryTextColor: '#F5F5F5'
    },];

    const [font, setFont] = useState();
    const [layout, setLayout] = useState();
    const [palette, setPalette] = useState(palettes[0]);
    const [showDescriptions, setShowDescriptions] = useState();
    const [showIcons, setShowIcons] = useState();
    const [showImages, setShowImages] = useState();
    const [showNavigation, setShowNavigation] = useState();

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
                <Dropdown
                    value={palette}
                    options={palettes}
                    onChange={(e) => {
                        setPalette(e.value);
                    }}
                    valueTemplate={selectedPaletteTemplate}
                    itemTemplate={paletteTemplate}
                    placeholder="Selecciona la paleta de colores"
                />
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