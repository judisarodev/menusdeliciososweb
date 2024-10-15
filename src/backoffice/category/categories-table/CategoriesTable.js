import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { CategoryForm } from "../category-form/CategoryForm";
import { FaImage } from "react-icons/fa";
import './categoriesTable.scss';


const tableTitleTemplate = (text) => {
    return <h2>{text}</h2>
}

const buttonTemplate = (rowData) => {
    return <Button onClick={() => console.log('')} label={<MdOutlineEdit size={20} />} severity="primary" tooltip="Editar" tooltipOptions={{ position: 'top' }} />;
}

const deleteButtonTemplate = (rowData) => {
    return <Button onClick={() => console.log('')} label={<MdDelete size={20} />} severity="danger" tooltip="Eliminar" tooltipOptions={{ position: 'top' }} />;;
}

const manageImageButtonTemplate = (rowData) => {
    return <Button onClick={() => console.log('')} label={<FaImage size={20} />} severity="secondary" tooltip="Imagen" tooltipOptions={{ position: 'top' }} />;;
}



const CategoriesTable = () => {

    // Context 
    
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [categoryId, setCategoryId] = useState();
    const [updateDishPanelVisibility, setUpdateDishPanelVisibility] = useState(false);

    return (<div className="category-table__container">
        
        <DataTable value={categories} header={tableTitleTemplate("Categorías")} tableStyle={{ minWidth: '50rem' }} >
            <Column style={{ width: '5%' }} body={buttonTemplate} header="Editar"></Column>
            <Column style={{ width: '5%' }} body={deleteButtonTemplate} header="Eliminar"></Column>
            <Column style={{ width: '5%' }} body={manageImageButtonTemplate} header="Imagen"></Column>
            <Column style={{ width: '85%' }} field="name" header="Imagen"></Column>
        </DataTable>

        {
            category &&
            <Dialog
                header="Actualizar categoryía"
                visible={updateDishPanelVisibility}
                style={{ width: '50vw' }}
                onHide={() => {
                    if (!updateDishPanelVisibility) {
                        return;
                    } else {
                        setCategory(null);
                        setCategoryId(null);
                        setUpdateDishPanelVisibility(false);
                    }
                }}>
                <CategoryForm />
            </Dialog>
        }
    </div>);
}

export { CategoriesTable }; 