import React, { useContext, useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.scss'; 
import { TokenContext } from "../../context/token/TokenContextProvider";
import { formatCurrency } from '../../../utils/currency/formatCurrency';
import { ProductsContext } from "../../context/restaurant/ProductsContext";
import { Button } from 'primereact/button';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { DishForm } from "../dish-form/DishForm";


const Table = () => {

    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const productsContext = useContext(ProductsContext);
    const { setProducts, products } =  productsContext; 
    
    // States
    const [updateDishPanelVisibility, setUpdateDishPanelVisibility] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [dish, setDish] = useState();
    const [dishId, setDishId] = useState(null);

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

    function sortProducts(){
        const data = products;
        // Se agrega formato a los precios
        data.forEach((dish) => {
            if(dish && dish.price){
                dish.price = '$' + formatCurrency(dish.price);
            }
        });

        // Se clasifican los platos según categoría
        const sortedProducts = data.reduce((sortedDishes, dish) => {
            const categoryId = dish.category.categoryId;
            const categoryName = dish.category.name;
            if(!sortedDishes[categoryId]){
                sortedDishes[categoryId] = {
                    categoryName, 
                    dishes: []
                };
            }
            sortedDishes[categoryId].dishes = [ ...sortedDishes[categoryId].dishes, dish];
            return sortedDishes;
        }, []);
        setDishes(sortedProducts);
    }

    function getDishes(){
        fetch(BASE_URL + '/dish/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
        }).then((data) => {
            data.forEach((product) => {
                if(product && !product.description){
                    product.description = 'Sin descripción'; 
                }
            });
            setProducts(data);
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
            getDishes();
            setDishId(null);
            setDish(null);
            setUpdateDishPanelVisibility(false);
        }).catch((error) => {
            console.error(error);
        });
    }

    // Effects
    useEffect(() => {
        if(token){
            getDish();
            setUpdateDishPanelVisibility(true);
        }
    }, [dishId, token]);


    useEffect(() => {
        if(products){
            sortProducts(); 
        }
    }, [products]);

    useEffect(() => {
        if(token){
            getDishes();
        }
    }, [token]);

    // Actions
    const showUpdateDishPanel = (dishId) => {
        setDishId(dishId);
    }

    const buttonTemplate = (rowData) => {
        return <Button onClick={() => showUpdateDishPanel(rowData.dishId)} label={<MdOutlineEdit size={20}/>} severity="primary" tooltip="Editar" tooltipOptions={{ position: 'top'}}/>;
    }

    const deleteButtonTemplate = (rowData) => {
        return <Button label={<MdDelete size={20}/>} severity="danger" tooltip="Eliminar" tooltipOptions={{ position: 'top'}}/>;;
    }

    const tableTitleTemplate = (text) => {
        return <h2>{text }</h2>
    }

    return(<div className="table__container">
        
        {dishes && dishes.length > 0 && dishes.map((p) => {    
            return(
                <div key={p.category}>
                    { updateDishPanelVisibility ? 'sip': 'nop'}
                    <DataTable value={p.dishes} header={tableTitleTemplate(p.categoryName)} tableStyle={{ minWidth: '50rem' }} >
                        <Column style={{ width: '5%' }} body={buttonTemplate} header="Editar"></Column>
                        <Column style={{ width: '5%' }} body={deleteButtonTemplate} header="Eliminar"></Column>
                        <Column style={{ width: '25%' }} field="name" header="Nombre"></Column>
                        <Column style={{ width: '25%' }} field="price" header="Precio"></Column>
                        <Column style={{ width: '40%' }} field="description" header="Descripción"></Column>
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