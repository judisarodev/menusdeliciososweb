import React, { useContext, useRef, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { OverlayPanel } from 'primereact/overlaypanel';
import { IoAddOutline } from "react-icons/io5";
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import './dishForm.scss';
import { TokenContext } from "../../context/token/TokenContextProvider";

const useCategory = () => {
    // Fake categories, they will be replaced with categories from the data base
    const allCategories = [{
        id: 1,
        name: 'Entradas'
    },{
        id: 2,
        name: 'Platos fuertes'
    },{
        id: 3,
        name: 'Bebidas'
    },{
        id: 4,
        name: 'Menú infantil'
    },{
        id: 5,
        name: 'Bebidas alcohólicas'
    },{
        id: 6,
        name: 'Postres'
    },];


    const [categories, setCategories] = useState(allCategories);
    const [category, setCategory] = useState(null);

    const changeCategory = (category) => {
        setCategory(category);
    };
    
    const addCategory = (name) => {
        const newCategory = {
            id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1,
            name
        };
        setCategories([...categories, newCategory]);
        changeCategory(newCategory); 
    };

    return {
        category,
        categories, 
        changeCategory, 
        addCategory,
    }
}

const DishForm = () => {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null); 
    const [price, setPrice] = useState(null);
    const [newCategory, setNewCategory] = useState(null);
    const { category, categories, changeCategory, addCategory } = useCategory();
    const message = useRef(null);
    const createCategoryForm = useRef(null); 
    const toast = useRef(null);
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const showErrorMessage = () => {
        message.current.show({severity: 'error', summary: 'Ingresa todos los campos del formulario'});
    }

    const createDish = (e) => {
        e.preventDefault(); 
        if(!name || !price || !category){
            showErrorMessage();
        }

        // Tarea: Agregar un servicio que permita la creación de platos 
    }

    const createCategory = (e) => {
        e.preventDefault(); 
        setNewCategory(null); 
        addCategory(newCategory);
        createCategoryForm.current.toggle(false);
    }

    const showCreateCategoryForm = (e) => {
        e.preventDefault(); 
        createCategoryForm.current.toggle(e);
    }

    const onUpload = () => {
        
    }
 
    return(<>    
        <Tooltip target=".tooltip-target" />
        <Messages ref={message} />
        <form className="dish-form__container">
            <div>
                <p className="dish-form__title">Crear producto</p>
            </div>
            <div className="dish-form__input-container">
                <label>Categoría *</label>
                <div className="dish-form__input__group">
                    <Dropdown 
                    value={category} 
                    onChange={(e) => changeCategory(e.value)}
                    options={categories}
                    optionLabel="name"
                    placeholder="Selecciona una categoría"/>
                    <Button onClick={showCreateCategoryForm} 
                    label={<IoAddOutline 
                    className="dish-form__input__group--icon tooltip-target"
                    size={25} color="white"/>}
                    tooltip="Crear categoría"
                    tooltipOptions={{ position: 'top' }}
                    />
                    <OverlayPanel ref={createCategoryForm}>
                        <form>
                            <div className="dish-form__input-container">
                                <label>Nueva categoría</label>
                                <InputText 
                                value={newCategory}   
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Ingresar categoría"/>
                                <br></br>
                                <Button 
                                label="Agregar"
                                onClick={createCategory}/>
                            </div>
                        </form>
                    </OverlayPanel>
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

            <div className="dish-form__input-container">
                <label>Agregar imagen (opcional)</label>
                <Toast ref={toast}></Toast>
                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Buscar" />
            </div>
         
            <Button label="CREAR" onClick={createDish}/>
        </form>
    </>);
};

export { DishForm }; 