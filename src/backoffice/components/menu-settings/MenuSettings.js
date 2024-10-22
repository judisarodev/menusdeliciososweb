import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import './menuSettings.scss';
import { InputSwitch } from 'primereact/inputswitch';
import { MenuContext } from "../../context/restaurant/MenuContext";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";

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
    const [visible, setVisible] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [backgroundImages, setBackgroundImages] = useState([]);

    async function updateMenu(object) {
        return await fetch(BASE_URL + '/menu/update/' + menuId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(object),
        }).then((response) => {
            if (response.ok) {
                return true;
            }
            return false;
        });
    }

    useEffect(() => {
        function getBakcgroundImages(){
            fetch(BASE_URL + '/restaurant/get-background-images', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error al consultar las imágenes');
            }).then((data) => {
                console.log(data);
                setBackgroundImages(data);
            }).catch((error) => {
                console.error(error);
            });
        }

        getBakcgroundImages();
    }, [token, BASE_URL]);

    useEffect(() => {
        setPalette(menu.palette);
        setLayout({ name: menu.layout || 'linearito' });
        setFont({ name: menu.font || 'Sans Serif' });
        setShowDescription(menu.showDescription);
        setShowIcons(menu.showIcons);
        setShowNavigation(menu.showNavigation);
        setShowImages(menu.showImage);
        setBackgroundImage(menu.backgroundImage);
    }, [menu]);

    const selectedPaletteTemplate = (option) => {
        if (option) {
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
        if (option) {
            return (
                <div style={{ fontFamily: option.name }}>
                    {option.name}
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
                {option.name}
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
            if (response.ok) {
                return response.json();
            }
            throw new Error('No fue posible consultar las paletas de colores');
        }).then((data) => {
            setPalettes(data);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const imageTemplate = (image) => {
        return (
            <div className="dish-form__image-temaplate">
                <Image src={BASE_URL + image.url} alt="Image" width="200" onClick={async () => {
                    const response = await updateMenu({ backgroundImageId: image.imageId });
                    if(response){
                            getMenu();
                    }
                    setVisible(false);
                }} />
            </div>
        );
    }

    const getImageTemplate = (url) => {
        return (
            <div className="dish-form__get-image-temaplate">
                <Image src={BASE_URL + url} alt="Image" width="150" preview />
            </div>
        );
    }

    return (<div className="menu-settings__container">
        <form className="dish-form__container">
            <div>
                <p className="dish-form__title">Configuración del menú</p>
            </div>

            <div className="dish-form__input-container">
                <label>Fuente</label>
                <Dropdown
                    value={font}
                    options={fonts}
                    optionLabel="name"
                    onChange={async (e) => {
                        const response = await updateMenu({ font: e.value.name });
                        if (response) {
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
                        if (response) {
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
                        if (response) {
                            getMenu();
                        }
                    }}
                    valueTemplate={selectedPaletteTemplate}
                    itemTemplate={paletteTemplate}
                    placeholder="Selecciona la paleta de colores"
                />}
            </div>

            <br></br>

            <div className="menu-settings__switch-contaier">

                <div>
                    <label>¿Mostrar menú general de navegación?</label>
                    <InputSwitch
                        checked={showNavigation}
                        onChange={async (e) => {
                            const response = await updateMenu({ showNavigation: e.value });
                            if (response) {
                                getMenu();
                            }
                        }} />
                </div>


                <div>
                    <label>¿Mostrar iconos de las categorías?</label>
                    <InputSwitch
                        checked={showIcons}
                        onChange={async (e) => {
                            const response = await updateMenu({ showIcons: e.value });
                            if (response) {
                                getMenu();
                            }
                        }} />
                </div>

                <div>
                    <label>¿Mostrar imágenes de los platos?</label>
                    <InputSwitch
                        checked={showImages}
                        onChange={async (e) => {
                            const response = await updateMenu({ showImages: e.value });
                            if (response) {
                                getMenu();
                            }
                        }} />
                </div>

                <div>
                    <label>¿Mostrar descripciones de los platos?</label>
                    <InputSwitch
                        checked={showDescription}
                        onChange={async (e) => {
                            const response = await updateMenu({ showDescription: e.value });
                            if (response) {
                                getMenu();
                            }
                        }} />
                </div>

            </div>

            <br></br>

            <div className="dish-form__input-container">
                <label>Image de fondo del menú</label>
                {backgroundImage && <div>
                    {getImageTemplate(backgroundImage.url)}
                </div>}
                <div className="dish-form__input-container">
                    <Button label={'Cambiar imagen de fondo del menú'} severity="secondary" outlined onClick={(e) => {
                        e.preventDefault();
                        setVisible(true);
                    }} />
                </div>

                <Dialog header="Seleccionar Imagen" visible={visible} modal onHide={() => setVisible(false)}>
                    <div className="dish-form__images-container">{
                        backgroundImages.map((i) => imageTemplate(i))
                    }</div>
                </Dialog>
            </div>
        </form>
    </div>);
}

export { MenuSettings };