import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import './categoryForm.scss';
import { FaHamburger } from "react-icons/fa";
import { FaPizzaSlice } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { GiTacos } from "react-icons/gi";


const CategoryForm = ({ buttonText = 'CREAR', showTitle = true, action }) => {
    // States
    const [name, setName] = useState();
    const [icon, setIcon] = useState();
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

    const iconTemplate = (icon) => {
        return <div className="category-form__icon-list-item">
            <div>{ icon.component }</div>
            <div>{icon.name}</div>
        </div>
    }

    return (<>
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
                {icons &&  <Dropdown
                    value={icon}
                    options={icons}
                    onChange={(e) => setIcon(e.value)}
                    optionLabel="name"
                    placeholder="Selecciona el icono"
                    itemTemplate={iconTemplate}
                />}
            </div>

            <Button
                label={buttonText}
                onClick={(event) => {
                    event.preventDefault();
                    action({ name, icon: icon.id });
                }
                }
            />
        </form>
    </>);
}

export { CategoryForm }; 