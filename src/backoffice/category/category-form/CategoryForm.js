import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import './categoryForm.scss';
import { FaHamburger } from "react-icons/fa";
import { FaPizzaSlice } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { GiTacos } from "react-icons/gi";
import { Toast } from "primereact/toast";

const CategoryForm = ({ buttonText = 'CREAR', showTitle = true, action }) => {
    // States
    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const icons = [{
            name: 'Comida rápida',
            id: 'fast-food',
            component: <IoFastFood />
        }, {
            name: 'Hamburguesa',
            id: 'hamburguer',
            component: <FaHamburger />
        }, {
            name: 'Pizza',
            id: 'pizza',
            component: <FaPizzaSlice />
        }, {
            name: 'Taco',
            id: 'taco',
            component: <GiTacos />
        }
    ];

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
                    if(name && selectedIcon){
                        action({ name, icon: selectedIcon.id });
                        setName('');
                        setSelectedIcon(null);
                    }else {
                        message.current.show({ severity: 'warn', summary: 'Ingresa los valores requeridos' });
                    }
                }
                }
            />
        </form>
    </>);
}

export { CategoryForm }; 