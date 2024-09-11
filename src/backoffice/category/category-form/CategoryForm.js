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

            <div className="dish-form__input-container">
                <label>Agregar imagen</label>
                <Toast ref={toast}></Toast>
                <FileUpload value={''} mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Elegir de galería" />
                <FileUpload value={''} mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Examinar equipo" />
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