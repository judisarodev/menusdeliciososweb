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
import { FaImage } from "react-icons/fa"
import { MenuContext } from "../../context/restaurant/MenuContext";

const Table = () => {

    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const menuContext = useContext(MenuContext);
    const { menu } = menuContext;
    
    // States
    const [updateDishPanelVisibility, setUpdateDishPanelVisibility] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [dish, setDish] = useState();
    const [dishIdToDelete, setDishIdToDelete] = useState(null);
    const [dishId, setDishId] = useState(null);
    
    // Reference
    const toast = useRef(null);

    useEffect(() => {
        if(menu.categories){
            setDishes(menu.categories);
        }
    }, [menu]);

    // Functions 
    function getDish(){
        fetch(BASE_URL + '/dish/get/' + dishId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            }
        }).then((response) => {
            if(!response.ok){
                throw new Error('No fue posible consultar el producto.')
            }
            return response.json();
        }).then((data) => {
            if(data){
                setDish(data);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    
    const updateDish = (name, price, category, description, image = 'image') => {
        fetch(BASE_URL + '/dish/update', {
            method: 'PATCH',
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
                    image
                }, 
                dishId
            }),
        }).then((response) => {
            if(!response.ok){
                throw new Error('No fue posible consultar el producto.')
            }
            return response.json();
        }).then((data) => {
            //getDishes();
            setDishId(null);
            setDish(null);
            setUpdateDishPanelVisibility(false);
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
            //getDishes();
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    // Effects
    useEffect(() => {
        if(token){
            //getDish();
            setUpdateDishPanelVisibility(true);
        }
    }, [dishId, token]);


    // Actions
    const showUpdateDishPanel = (dishId) => {
        setDishId(dishId);
    }

    const showDeleteDishPanel = (dishId) => {
        deleteDish(dishId);
    }

    const buttonTemplate = (rowData) => {
        return <Button onClick={() => showUpdateDishPanel(rowData.dishId)} label={<MdOutlineEdit size={20}/>} severity="primary" tooltip="Editar" tooltipOptions={{ position: 'top'}}/>;
    }

    const deleteButtonTemplate = (rowData) => {
        return <Button onClick={() => showDeleteDishPanel(rowData.dishId)} label={<MdDelete size={20}/>} severity="danger" tooltip="Eliminar" tooltipOptions={{ position: 'top'}}/>;;
    }

    const tableTitleTemplate = (text) => {
        return <h2>{text }</h2>
    }

    const manageImageButtonTemplate = (rowData) => {
        return <Button onClick={() => console.log('')} label={<FaImage size={20} />} severity="secondary" tooltip="Imagen" tooltipOptions={{ position: 'top' }} />;;
    }

    return(<div className="table__container">
        
        {dishes && dishes.length > 0 && dishes.map((p) => {    
            return(
                <div key={p.name}>
                    <DataTable value={p.dishes} header={tableTitleTemplate(p.name)} tableStyle={{ minWidth: '50rem' }} emptyMessage={'No hay platos en esta categoría'} >
                        <Column style={{ width: '5%' }} body={buttonTemplate} header="Editar"></Column>
                        <Column style={{ width: '5%' }} body={deleteButtonTemplate} header="Eliminar"></Column>
                        <Column style={{ width: '5%' }} body={manageImageButtonTemplate} header="Imagen"></Column>
                        <Column style={{ width: '25%' }} field="name" header="Nombre"></Column>
                        <Column style={{ width: '25%' }} field="price" header="Precio"></Column>
                        <Column style={{ width: '35%' }} field="description" header="Descripción"></Column>
                    </DataTable>

                    {
                        dish && dish.category &&  
                        <Dialog
                        header="Actualizar producto" 
                        visible={updateDishPanelVisibility} 
                        style={{ width: '50vw' }} 
                        onHide={() => {
                        if (!updateDishPanelVisibility) {
                            return;
                        }else {
                            setDish(null);
                            setDishId(null);
                            setUpdateDishPanelVisibility(false); 
                        }}}>
                            <DishForm
                                buttonText={'ACTUALIZAR'} 
                                showTitile={false} 
                                showAddCategoryButton={false}
                                action={updateDish} 
                                givenName={dish.name}
                                givenCategory={dish.category}
                                givenDescription={dish.description}
                                givenPrice={dish.price}
                            />
                        </Dialog>
                    }
                </div>
        )})}
    </div>);
}
export { Table }; 