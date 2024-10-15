import React, { useContext, useRef, useEffect, useState } from "react";
import './home.scss';
import { DishForm } from "../../dish/dish-form/DishForm";
import { Table } from "../../dish/dishes-table/Table";
import { Emulator } from "./../../components/emulator/Emulator";
import { CategoriesContextProvider } from "../../context/restaurant/CategoriesContext";
import { ProductsContext, ProductsContextProvider } from "../../context/restaurant/ProductsContext";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { CategoryForm } from "../../category/category-form/CategoryForm";
import { CategoriesTable } from "../../category/categories-table/CategoriesTable";
import { Toast } from "primereact/toast";

const Home = () => {    
    // Env
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const productsContext = useContext(ProductsContext);

    // References
    const message = useRef(null);

    // State
    const [menuId, setMenuId] = useState();

    const createDish = (name, price, category, description = '', image = 'image') => {
        if(!name || !price || !category){
            return message.current.show({ severity: 'error', summary: 'Ingresa los valores requeridos' });
        }

        // Tarea: Agregar un servicio que permita la creación de platos 
        fetch(BASE_URL + '/dish/create', {
            method: 'POST', 
            body: JSON.stringify({
                categoryId: category.categoryId,
                name,
                price,
                description,
                image,
            }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            }
        }).then((response) => {
            if(!response.ok){
                throw new Error('Error al crear producto');
            }
            
            return response.json();
        }).then((data) => {
            console.log([...productsContext.products, { ...data }]);
            productsContext.setProducts([...productsContext.products, { ...data }]);
            message.current.show({ severity: 'info', summary: '' });
        }).catch((error) => {
            message.current.show({ severity: 'error', summary: '' });
            console.error(error);
        });
    }

    function createCategory({ name, icon }){
        fetch(BASE_URL + '/category/create', {
            method: 'POST', 
            body: JSON.stringify({
                name, icon, menuId
            }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            }
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error();
        }).then((data) => {
            
        }).catch((error) => {
            
        });
    }
    
    useEffect(() => {
        function getRestaurant(){
            fetch(BASE_URL + '/restaurant/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                if(response.ok){
                    return response.json();
                }
            }).then((data) => {
                setMenuId(data.menuId);
                getMenu(data.menuId);
            }).catch(() => {
                message.current.show({ severity: 'error', summary: 'Ha ocurrido un error' });
            });
        }

        function getMenu(menuId){
            fetch(BASE_URL + '/menu/get/' + menuId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                if(response.ok){
                    return response.json();
                }
            }).then((data) => {
                console.log(data);
            }).catch(() => {
                message.current.show({ severity: 'error', summary: 'Ha ocurrido un error' });
            });
        }

        if(token){
            getRestaurant();
        }
    }, [token]);

    return(<>
        <div className="bhome__container">
            <div className="bhome__manager-container">
                <Toast ref={message} />
                <div>
                    <CategoryForm action={createCategory} />
                    <DishForm action={createDish} buttonText={'CREAR'}/>
                </div>
            </div>
            <div className="bhome__menu-sample">
                <Emulator />
            </div>
            <div className="bhome__table">
                <CategoriesTable />
                <Table />
            </div>
        </div>
    </>);
}

export { Home }; 