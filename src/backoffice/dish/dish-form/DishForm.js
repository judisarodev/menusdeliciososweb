import React, { useContext, useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { MenuContext } from "../../context/restaurant/MenuContext";
import noImage from './../../../assets/images/no-image.png';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { TokenContext } from "../../context/token/TokenContextProvider";
import './dishForm.scss';

const DishForm = ({
    buttonText,
    action,
    showTitile = true,
    givenName = '',
    givenCategory = null,
    givenPrice = 0,
    givenDescription = '',
    givenImage
}) => {
    // States
    const [name, setName] = useState(givenName);
    const [description, setDescription] = useState(givenDescription);
    const [price, setPrice] = useState(givenPrice);
    const [image, setImage] = useState(givenImage);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(givenCategory);
    const [visible, setVisible] = useState(false);
    const [images, setImages] = useState([]);

    // Env
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const menuContext = useContext(MenuContext);
    const { menu } = menuContext;
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const openDialog = () => {
        setVisible(true);
    };

    const getImageTemplate = (url) => {
        if (!url) {
            return (
                <div className="dish-form__get-image-temaplate">
                    <Image src={noImage} alt="Image" width="150" preview />
                </div>);
        }
        return (
            <div className="dish-form__get-image-temaplate">
                <Image src={BASE_URL + url} alt="Image" width="150" preview />
            </div>
        );
    }

    const imageTemplate = (image) => {
        return (
            <div className="dish-form__image-temaplate">
                <Image src={BASE_URL + image.url} alt="Image" width="200" onClick={() => {
                    setImage(image);
                    setVisible(false);
                }} />
            </div>
        );
    }

    const onHide = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (menu && menu.categories) {
            setCategories(menu.categories.map((category) => {
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                }
            }));
        }

        if (token) {
            fetch(BASE_URL + '/restaurant/get-images', {
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
                setImages(data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [menu, token]);

    return (<>
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
                        placeholder="Selecciona una categoría" />
                </div>
            </div>

            <div className="dish-form__input-container">
                <label>Nombre del producto *</label>
                <InputText
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa el nombre del producto" />
            </div>

            <div className="dish-form__input-container">
                <label>Precio *</label>
                <InputNumber
                    value={price}
                    onChange={(e) => setPrice(e.value)}
                    placeholder="Ingresa el costo del producto"
                    mode="currency"
                    currency="COP"
                    maxFractionDigits={0} />
            </div>

            <div className="dish-form__input-container">
                <label>Descripción (opcional)</label>
                <InputTextarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ingresa una breve descripción o ingredientes del producto"
                    rows={3} />
            </div>

            <div>
                {image && <div>
                    <div className="dish-form__input-container">
                        <label>Imagen seleccionada (opcional)</label>
                    </div>
                    <div>
                        {getImageTemplate(image.url)}
                    </div>
                </div>}
                <div className="dish-form__input-container">
                    <Button label={!image ? 'Agregar Imagen' : 'Cambiar imagen'} severity="secondary" outlined onClick={(e) => {
                        e.preventDefault();
                        openDialog();
                    }} />
                </div>
            </div>

            <Dialog header="Seleccionar Imagen" visible={visible} onHide={onHide} modal>
                <div className="dish-form__images-container">{
                    images.map((i) => imageTemplate(i))
                }</div>
            </Dialog>

            <Button
                label={buttonText}
                onClick={(event) => {
                    event.preventDefault();
                    if (name && price && category) {
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