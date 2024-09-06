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
import { Dialog } from 'primereact/dialog';
import { DishForm } from "../dish-form/DishForm";

const UpdateDishPanel = ({ visibility, setVisibility, dishId }) => {

    // Env
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    // State
    const [dish, setDish] = useState(null);

    useEffect(() => {
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
                console.log('data', data);
                if(data){
                    setDish(data);
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        if(token){
            getDish();
        }
    }, [dishId, token]);

    const updateDish = (name, category, price, description) => {

    }

    return(
        <>
        {   dish && 
            <Dialog 
                header="Actualizar producto" 
                visible={visibility} 
                style={{ width: '50vw' }} 
                onHide={() => {
                if (!visibility) {
                    return;
                }else {
                    setDish(null);
                    setVisibility(false); }  
                } 
                }>
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
        </>
    );
}

const Table = () => {

    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const productsContext = useContext(ProductsContext);
    const { setProducts, products } =  productsContext; 
    const [dishes, setDishes] = useState([]);
    const [updateDishPanelVisibility, setUpdateDishPanelVisibility] = useState(false);
    const [dishId, setDishId] = useState(null);

    useEffect(() => {
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

        if(products){
            sortProducts(); 
        }
    }, [products]);

    useEffect(() => {
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

        if(token){
            getDishes();
        }
    }, [token]);

    const showUpdateDishPanel = (dishId) => {
        setDishId(dishId);
        setUpdateDishPanelVisibility(true);
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
        
        <UpdateDishPanel 
            visibility={updateDishPanelVisibility} 
            setVisibility={setUpdateDishPanelVisibility}
            dishId={dishId}
        />

        {dishes && dishes.length > 0 && dishes.map((p) => {    
            return(
                <div key={p.category}>
                    <DataTable value={p.dishes} header={tableTitleTemplate(p.categoryName)} tableStyle={{ minWidth: '50rem' }} >
                        <Column style={{ width: '5%' }} body={buttonTemplate} header="Editar"></Column>
                        <Column style={{ width: '5%' }} body={deleteButtonTemplate} header="Eliminar"></Column>
                        <Column style={{ width: '25%' }} field="name" header="Nombre"></Column>
                        <Column style={{ width: '25%' }} field="price" header="Precio"></Column>
                        <Column style={{ width: '40%' }} field="description" header="Descripción"></Column>
                    </DataTable>
                </div>
        )})}
    </div>);
}
export { Table }; 