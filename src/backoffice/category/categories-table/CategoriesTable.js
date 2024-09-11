import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import React, { useContext, useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { CategoryForm } from "../category-form/CategoryForm";
import { CategoriesContext } from "../../context/restaurant/CategoriesContext";


const tableTitleTemplate = (text) => {
    return <h2>{text }</h2>
}

const buttonTemplate = (rowData) => {
    return <Button onClick={() => console.log('')} label={<MdOutlineEdit size={20}/>} severity="primary" tooltip="Editar" tooltipOptions={{ position: 'top'}}/>;
}

const deleteButtonTemplate = (rowData) => {
    return <Button onClick={() => console.log('')} label={<MdDelete size={20}/>} severity="danger" tooltip="Eliminar" tooltipOptions={{ position: 'top'}}/>;;
}



const CategoriesTable = () => {

    // Context 
    const categoriesContext = useContext(CategoriesContext);

    const [categories, setCategories] = useState(categoriesContext.categories);
    const [category, setCategory] = useState();
    const [categoryId, setCategoryId] = useState();
    const [updateDishPanelVisibility, setUpdateDishPanelVisibility] = useState(false);

    return(<>
        {categories && categories.length > 0 && categories.map((p) => {    
            return(
                <div key={p.dish}>
                    <DataTable value={p.dishes} header={tableTitleTemplate(p.categoryName)} tableStyle={{ minWidth: '50rem' }} >
                        <Column style={{ width: '5%' }} body={buttonTemplate} header="Editar"></Column>
                        <Column style={{ width: '5%' }} body={deleteButtonTemplate} header="Eliminar"></Column>
                        <Column style={{ width: '25%' }} field="name" header="Nombre"></Column>
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
                        }else {
                            setCategory(null);
                            setCategoryId(null);
                            setUpdateDishPanelVisibility(false); 
                        }}}>
                            <CategoryForm />
                        </Dialog>
                    }
                </div>
        )})}
    </>);
}

export { CategoriesTable }; 