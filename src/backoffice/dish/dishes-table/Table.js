import React, { useContext, useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.scss'; 
import { TokenContext } from "../../context/token/TokenContextProvider";
import { Button } from 'primereact/button';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { DishForm } from "../dish-form/DishForm";
import noImage from './../../../assets/images/no-image.png';
import { MenuContext } from "../../context/restaurant/MenuContext";
import { Image } from 'primereact/image';
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";


const Table = () => {

    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const menuContext = useContext(MenuContext);
    const { menu, getMenu } = menuContext;
    
    // States
    const [updateDishPanelVisibility, setUpdateDishPanelVisibility] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [dish, setDish] = useState();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        if(menu.categories){
            setDishes(menu.categories);
            setCategories(menu.categories.map((category) => {
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                }
            }));
        }
    }, [menu]);
    
    const updateDish = (name, price, category, description, image) => {
        fetch(BASE_URL + '/dish/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                data: {
                    name,
                    price,
                    categoryId: category.categoryId,
                    description,
                    imageId: image.imageId
                },
                dishId: dish.dishId
            }),
        }).then((response) => {
            if(!response.ok){
                throw new Error('No fue posible consultar el producto.')
            }
            return response.json();
        }).then((data) => {
            getMenu();
            setUpdateDishPanelVisibility(false);
            setDish(null);
        }).catch((error) => {
            console.error(error);
        });
    }

    function deleteDish(dishId){
        fetch(BASE_URL + '/dish/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dishId
            }),
        }).then((response) => {
            if(!response.ok){
                throw new Error('No fue posible eliminar el producto.')
            }
            return response.json();
        }).then((data) => {
            getMenu();
        }).catch((error) => {
            console.error(error);
        });
    }


    const buttonTemplate = (rowData) => {
        return <Button onClick={() => {
            setDish(rowData);
            setUpdateDishPanelVisibility(true);
        }} label={<MdOutlineEdit size={20}/>} severity="primary" tooltip="Editar" tooltipOptions={{ position: 'top'}}/>;
    }

    const deleteButtonTemplate = (rowData) => {
        return <Button onClick={() => deleteDialog(rowData)} label={<MdDelete size={20}/>} severity="danger" tooltip="Eliminar" tooltipOptions={{ position: 'top'}}/>;;
    }

    const tableTitleTemplate = (text) => {
        return <h2>{text }</h2>
    }

    const manageImageButtonTemplate = (rowData) => {
        if(!rowData.image){
            return <Image src={noImage} alt="Image" width="60" preview />;
        }
        return <Image src={BASE_URL + rowData.image.url} alt="Image" width="60" preview />;
    }

    const deleteDialog = (rowData) => {
        confirmDialog({
            message: '¿Estás seguro de que deseas borrar este plato?',
            header: 'Confirmación',
            defaultFocus: 'accept',
            accept: () => deleteDish(rowData.dishId),
        });
    };

    return(<div className="table__container">
        <ConfirmDialog />
        {dishes && dishes.length > 0 && dishes.map((p) => {    
            return(
                <div key={p.name}>
                    <DataTable value={p.dishes.map((t) => { return { ...t, category: p.name }})} header={tableTitleTemplate(p.name)} tableStyle={{ minWidth: '50rem' }} emptyMessage={'No hay platos en esta categoría'} >
                        <Column style={{ width: '10%' }} body={buttonTemplate} header="Editar"></Column>
                        <Column style={{ width: '10%' }} body={deleteButtonTemplate} header="Eliminar"></Column>
                        <Column style={{ width: '10%' }} body={manageImageButtonTemplate} header="Imagen"></Column>
                        <Column style={{ width: '15%' }} field="name" header="Nombre"></Column>
                        <Column style={{ width: '15%' }} field="price" header="Precio"></Column>
                        <Column style={{ width: '15%' }} field="description" header="Descripción"></Column>
                        <Column style={{ width: '15%' }} field="category" header="Categoría"></Column>
                    </DataTable>

                    {
                        <Dialog
                        header="Actualizar producto" 
                        visible={updateDishPanelVisibility} 
                        style={{ width: '50vw' }} 
                        onHide={() => {
                        if (!updateDishPanelVisibility) {
                            return;
                        }else {
                            setDish(null);
                            setUpdateDishPanelVisibility(false); 
                        }}}>
                            {dish && <DishForm
                              buttonText={'ACTUALIZAR'}
                              action={updateDish}
                              showTitile={false}
                              givenName={dish.name}
                              givenPrice={dish.price}
                              givenDescription={dish.description}
                              givenCategory={categories.find((e) => e.name === dish.category)}
                              givenImage={dish.image}
                            />}
                        </Dialog>
                    }
                </div>
        )})}
    </div>);
}
export { Table }; 