import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import React, { useState, useRef, useContext } from "react";
import './categoryForm.scss';
import { Toast } from "primereact/toast";
import { IconsContext } from "../../context/restaurant/IconsContext";

const CategoryForm = ({ givenName = '', givenIcon = null, buttonText = 'CREAR', showTitle = true, action }) => {
    // States
    const [name, setName] = useState(givenName);
    const [selectedIcon, setSelectedIcon] = useState(givenIcon);
    const { icons } = useContext(IconsContext);

    // References
    const message = useRef(null);

    const iconTemplate = (icon) => {
        return <div className="category-form__icon-list-item">
            <div>{ icon.component }</div>
            <div>{icon.name}</div>
        </div>
    }

    const selectedIconTemplate = (option, props) => {
        if (selectedIcon) {
            return (
                <div className="category-form__icon-list-item">
                    <div>{selectedIcon.component}</div>
                    <div>{selectedIcon.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    return (<>
        <Toast ref={message} />
        <form className="dish-form__container">
            {showTitle && <div>
                <p className="dish-form__title">Crear categoría</p>
            </div>}

            <div className="dish-form__input-container">
                <label>Nombre de la categoría *</label>
                <InputText
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa el nombre del producto" />
            </div>

            <div className="dish-form__input-container">
                <label>Icono *</label>
                <Dropdown
                    value={selectedIcon}
                    options={icons}
                    optionLabel="name"
                    onChange={(e) => {
                        setSelectedIcon(e.value);
                    }}
                    placeholder="Selecciona el icono"
                    itemTemplate={iconTemplate}
                    valueTemplate={selectedIconTemplate} 
                />
            </div>

            <Button
                label={buttonText}
                onClick={(event) => {
                    event.preventDefault();
                    action(name, selectedIcon.id);
                    setName('');
                    setSelectedIcon(null);
                }
                }
            />
        </form>
    </>);
}

export { CategoryForm }; 