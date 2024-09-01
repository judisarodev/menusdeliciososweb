import React, { useContext, useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.scss'; 
import { TokenContext } from "../../context/token/TokenContextProvider";
import { formatCurrency } from '../../../utils/currency/formatCurrency';
import { ProductsContext } from "../../context/restaurant/ProductsContext";
const Table = () => {

    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const productsContext = useContext(ProductsContext);
    const { setProducts } =  productsContext; 

    const [dishes, setDishes] = useState([]);

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
                setProducts(data);

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
            }).catch((error) => {
                console.error(error); 
            });
        }

        if(token){
            getDishes();
        }
    }, [token]);

    return(<div className="table__container">
        {dishes && dishes.length > 0 && dishes.map((p) => {    
            return(
                <div key={p.category}>
                    <DataTable value={p.dishes} header={p.categoryName} tableStyle={{ minWidth: '50rem' }} >
                        <Column style={{ width: '25%' }} field="name" header="Nombre"></Column>
                        <Column style={{ width: '25%' }} field="price" header="Precio"></Column>
                        <Column field="description" header="Descripción"></Column>
                    </DataTable>
                </div>
        )})}
    </div>);
}
export { Table }; 