import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { CategoryForm } from "../category-form/CategoryForm";
import { IoFastFood } from "react-icons/io5";
import './categoriesTable.scss';
import { MenuContext } from "../../context/restaurant/MenuContext";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { IconsContext } from "../../context/restaurant/IconsContext";

const CategoriesTable = () => {
    // Env
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const menuContext = useContext(MenuContext);
    const { menu } = menuContext;
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const { icons } = useContext(IconsContext);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [categoryId, setCategoryId] = useState();
    const [updateDishPanelVisibility, setUpdateDishPanelVisibility] = useState(false);

    useEffect(() => {
        if(menu && menu.categories){
            setCategories(menu.categories.map((category) => {
                return {
                    categoryId: category.categoryId,
                    name: category.name,
                    icon: category.icon
                }
            }));
        }
    }, [menu]);

    
    const deleteCategory = (categoryId) => {
        fetch(BASE_URL + '/category/delete/' + categoryId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
            }
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Error al eliminar la categoría');
        }).then((data) => {
            console.log('Categoría eliminada con éxito');
        }).catch((error) => {
            console.error('Error al eliminar la categoría ', error);
        });
    }
    
    const tableTitleTemplate = (text) => {
        return <h2>{text}</h2>
    }
    
    const buttonTemplate = (rowData) => {
        return (
            <Button 
            onClick={() => {
                setCategory(rowData);
                setUpdateDishPanelVisibility(true)
            }} 
            label={ <MdOutlineEdit size={20} /> } 
            severity="primary" 
            tooltip="Editar" 
            tooltipOptions={{ position: 'top' }} />
        );
    }

    const iconTemplate = (rowData) => { 
        const i = icons.find((icon) => icon.id === rowData.icon);
        return (
            <div className="category-table__big-icon">
                { i.component }
            </div>
        );
    }
    
    const deleteButtonTemplate = (rowData) => {
        return <Button onClick={() => deleteCategory(rowData.categoryId)} label={<MdDelete size={20} />} severity="danger" tooltip="Eliminar" tooltipOptions={{ position: 'top' }} />;;
    }

    const updateCategory = (name, icon) => {
        fetch(BASE_URL + '/category/update', {
            method: 'PUT',
            body: JSON.stringify({
                name,
                icon,
                categoryId: category.categoryId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            }
        }).then((response) => {
            setUpdateDishPanelVisibility(false);
            if(response.ok){
                return response.json();
            }
            throw new Error('Error al actualizar la categoría');
        }).then((data) => {
            console.log('Categoría actualizada con éxito');
        }).catch((error) => {
            console.error(error);
        });
    }

    return (<div className="category-table__container">
        
        <DataTable value={categories} header={tableTitleTemplate("Categorías")} tableStyle={{ minWidth: '50rem' }} emptyMessage={'No hay categorías'} >
            <Column style={{ width: '10%' }} body={buttonTemplate} header="Editar"></Column>
            <Column style={{ width: '10%' }} body={deleteButtonTemplate} header="Eliminar"></Column>
            <Column style={{ width: '10%' }} body={iconTemplate} header="Icono"></Column>
            <Column style={{ width: '70%' }} field="name" header="Nombre"></Column>
        </DataTable>

        {
            category &&
            <Dialog
                header="Actualizar categoría"
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
                <CategoryForm 
                showTitle={false} 
                buttonText={'ACTUALIZAR'} 
                givenName={category.name}
                givenIcon={icons.find((icon) => icon.id === category.icon)}
                action={updateCategory}
                />
            </Dialog>
        }
    </div>);
}

export { CategoriesTable }; 