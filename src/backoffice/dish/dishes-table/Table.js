import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.scss'; 
import { Divider } from "primereact/divider";

const Table = () => {
    const [products, setProducts] = useState([{
        name: 'Pastas a la boloñesa',
        price: '2000000',
        category: 'Platos fuertes',
        description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) ',
    }, {
        name: 'Patacones fritos',
        price: '1000000',
        category: 'Platos fuertes',
        description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) ',
    }]);

    const header = (
        <p className="table__title">Productos</p>
    );

    return(<div className="table__container">
        <DataTable value={products} header={header} tableStyle={{ minWidth: '50rem' }} size={'small'} stripedRows >
            <Column field="name" header="Nombre"></Column>
            <Column field="price" header="Precio"></Column>
            <Column field="category" header="Categoría"></Column>
            <Column field="description" header="Descripción"></Column>
        </DataTable>
    </div>);
}
export { Table }; 