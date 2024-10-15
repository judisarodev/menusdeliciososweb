import React, { useContext, useEffect, useRef, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { IoAddOutline } from "react-icons/io5";
import { Tooltip } from 'primereact/tooltip';
import { TokenContext } from "../../context/token/TokenContextProvider";
import { MenuContext } from "../../context/restaurant/MenuContext";
import './dishForm.scss';

const DishForm = ({
    buttonText, 
    action, 
    showTitile = true, 
    givenName = '', 
    givenCategory = null, 
    givenPrice = 0, 
    givenDescription = '' 
}) => {
    // States
    const [name, setName] = useState(givenName);
    const [description, setDescription] = useState(givenDescription); 
    const [price, setPrice] = useState(givenPrice);
    const [image, setImage] = useState();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(givenCategory);
    
    // References 
    const toast = useRef(null);
    
    const createCategoryForm = useRef(null); 

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const menuContext = useContext(MenuContext);
    const { menu } = menuContext;

    useEffect(() => {
        if(menu && menu.categories){
            setCategories(menu.categories.map((category) => {
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                }
            }));
        }
    }, [menu]);

    return(<>    
        <Tooltip target=".tooltip-target" />
        <form className="dish-form__container">
            {showTitile && <div>
                <p className="dish-form__title">Crear producto</p>
            </div>}
            <div className="dish-form__input-container">
                <label>Categoría *</label>
                <div className={'dish-form__input-container'}>
                    <Dropdown 
                    value={category} 
                    onChange={(e) => setCategory(e.value)}
                    options={categories}
                    optionLabel="name"
                    placeholder="Selecciona una categoría"/>
                </div>
            </div>

            <div className="dish-form__input-container">
                <label>Nombre del producto *</label>
                <InputText 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa el nombre del producto"/>
            </div>
            
            <div className="dish-form__input-container">
                <label>Precio *</label>
                <InputNumber 
                value={price} 
                onChange={(e) => setPrice(e.value)}
                placeholder="Ingresa el costo del producto"
                mode="currency"
                currency="COP"
                maxFractionDigits={0}/>
            </div>

            <div className="dish-form__input-container">
                <label>Descripción (opcional)</label>
                <InputTextarea  
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ingresa una breve descripción o ingredientes del producto"
                rows={3}/>
            </div>

            <Button 
                label={ buttonText }
                onClick={(event) => {
                    event.preventDefault(); 
                    if(name && price && category){
                        action(name, price, category, description, image)
                        setName('');
                        setPrice(0);
                        setCategory(null);
                        setDescription('');
                        setImage('');
                    }
                }
            }
            />
        </form>
    </>);
};

export { DishForm }; 