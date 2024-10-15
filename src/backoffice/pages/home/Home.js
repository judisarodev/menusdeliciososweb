import React, { useContext, useRef, useEffect } from "react";
import './home.scss';
import { DishForm } from "../../dish/dish-form/DishForm";
import { Table } from "../../dish/dishes-table/Table";
import { Emulator } from "./../../components/emulator/Emulator";
import { CategoriesContextProvider } from "../../context/restaurant/CategoriesContext";
import { ProductsContext, ProductsContextProvider } from "../../context/restaurant/ProductsContext";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { Messages } from "primereact/messages";
import { CategoryForm } from "../../category/category-form/CategoryForm";
import { CategoriesTable } from "../../category/categories-table/CategoriesTable";

const Home = () => {    

    const BASE_URL = process.env.REACT_APP_URL;
    const tokenContext = useContext(TokenContext);
    const productsContext = useContext(ProductsContext);
    const { token } = tokenContext;
    const message = useRef(null);

    const showMessage = (severity, text) => {
        message.current.show({severity, summary: text});
    }

    const createDish = (name, price, category, description = '', image = 'image') => {
        if(!name || !price || !category){
            showMessage('error', 'Error al crear el producto');
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
            showMessage('info', 'Producto creado con éxito');
        }).catch((error) => {
            showMessage('error', 'Error al crear el producto');
            console.error(error);
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
                <Messages ref={message} />
                <div>
                    <CategoryForm />
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