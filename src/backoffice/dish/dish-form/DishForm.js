import React, { useContext, useEffect, useRef, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { IoAddOutline } from "react-icons/io5";
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import './dishForm.scss';
import { TokenContext } from "../../context/token/TokenContextProvider";
import { CategoriesContext } from "../../context/restaurant/CategoriesContext";

// React hook for categories management
const useCategory = () => {

    // States
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    // Functions
    const setAllCategories = (categoriesList) => {
        setCategories(categoriesList);
    }

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
        setAllCategories
    }
}

const DishForm = ({
    buttonText, 
    action, 
    showTitile = true, 
    showAddCategoryButton = true,
    givenName = '', 
    givenCategory = null, 
    givenPrice = 0, 
    givenDescription = '' 
}) => {
    // States
    const [name, setName] = useState(givenName);
    const [description, setDescription] = useState(givenDescription); 
    const [price, setPrice] = useState(givenPrice);
    const [newCategory, setNewCategory] = useState();
    const [image, setImage] = useState();
    const { setAllCategories, category, categories, changeCategory, addCategory } = useCategory();
    
    // References 
    const toast = useRef(null);
    
    const createCategoryForm = useRef(null); 

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const categoriesContext = useContext(CategoriesContext);
    //const productsContext = useContext(ProductsContext);


    // Env
    const BASE_URL = process.env.REACT_APP_URL;

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

    useEffect(() => {
        function getCategories(){
            fetch(BASE_URL + '/category/get-all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token,
                }
            }).then((response) => {
                if(!response.ok){
                    throw new Error('No fue posible consultar las categorías.')
                }
                return response.json();
            }).then((data) => {
                setAllCategories(data);
                categoriesContext.setCategories(data);
            }).catch((error) => {
                console.error(error);
            });
        }
        
        if(token && !categoriesContext.categories){
            getCategories();
        }else {
            setAllCategories(categoriesContext.categories);
            console.log(categoriesContext.categories); 
        }   
        
        console.log('given category', givenCategory);
        changeCategory(givenCategory);
    }, [token]);
 
    return(<>    
        <Tooltip target=".tooltip-target" />
        
        <form className="dish-form__container">
            {showTitile && <div>
                <p className="dish-form__title">Crear producto</p>
            </div>}
            <div className="dish-form__input-container">
                <label>Categoría *</label>
                <div className={showAddCategoryButton ? 'dish-form__input__group' : 'dish-form__input-container'}>
                    <Dropdown 
                    value={category} 
                    onChange={(e) => changeCategory(e.value)}
                    options={categories}
                    optionLabel="name"
                    placeholder="Selecciona una categoría"/>
                    {
                        showAddCategoryButton &&
                        <Button onClick={showCreateCategoryForm} 
                        label={<IoAddOutline 
                        className="dish-form__input__group--icon tooltip-target"
                        size={25} color="white"/>}
                        tooltip="Crear categoría"
                        tooltipOptions={{ position: 'top' }}
                        />
                    }
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
                <FileUpload value={''} mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Elegir de galería" />
                <FileUpload value={''} mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Examinar equipo" />
            </div>

            <Button 
                label={ buttonText }
                onClick={(event) => {
                    event.preventDefault(); 
                    action(name, price, category, description, image)
                }
            }
            />
        </form>
    </>);
};

export { DishForm }; 