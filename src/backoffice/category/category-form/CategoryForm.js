import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";

const CategoryForm = ({ buttonText = 'CREAR', showTitle = true, action }) => {
    // States
    const [name, setName] = useState();
    const [image, setImage] = useState();
    const toast = useRef(null);

    // Env
    const BASE_URL = process.env.REACT_APP_URL;
    
    // Functions
    const onUpload = () => {

    }

    return(<>
        <form className="dish-form__container">
            {showTitle && <div>
                <p className="dish-form__title">Crear categoría</p>
            </div>}
            
            <div className="dish-form__input-container">
                <label>Nombre de la categoría *</label>
                <InputText 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa el nombre del producto"/>
            </div>

            <Button 
                label={ buttonText }
                onClick={(event) => {
                    event.preventDefault(); 
                    action(name, image);
                }
            }
            />
        </form>
    </>);
}

export { CategoryForm }; 