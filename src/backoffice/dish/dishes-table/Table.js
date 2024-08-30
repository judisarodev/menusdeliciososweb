import React, { useContext, useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.scss'; 
import { Divider } from "primereact/divider";
import { TokenContext } from "../../context/token/TokenContextProvider";

const Table = () => {

    // Data
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const [products, setProducts] = useState([]);

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
                console.log(data);
                setProducts(data);
            }).catch((error) => {
                console.error(error); 
            });
        }

        getDishes();
    }, [BASE_URL, token]);

    const header = (
        <p className="table__title">Productos</p>
    );

    return(<div className="table__container">
        <DataTable value={products} header={header} tableStyle={{ minWidth: '50rem' }} size={'small'} stripedRows >
            <Column field="name" header="Nombre"></Column>
            <Column field="price" header="Precio"></Column>
            <Column field="category.name" header="Categoría"></Column>
            <Column field="description" header="Descripción"></Column>
        </DataTable>
    </div>);
}
export { Table }; 