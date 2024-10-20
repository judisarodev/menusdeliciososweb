import React, { useContext, useRef, useEffect, useState } from "react";
import './home.scss';
import { DishForm } from "../../dish/dish-form/DishForm";
import { Table } from "../../dish/dishes-table/Table";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MenuContext } from "../../context/restaurant/MenuContext";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { Messages } from "primereact/messages";
import { CategoryForm } from "../../category/category-form/CategoryForm";
import { CategoriesTable } from "../../category/categories-table/CategoriesTable";
import { MenuSettings } from "../../components/menu-settings/MenuSettings";
import { Button } from "primereact/button";
import { FaChartPie } from "react-icons/fa";

const Home = () => {
    // Env
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const menuContext = useContext(MenuContext);
    const { menuId, setMenuId, setMenu, getMenu } = menuContext;

    // References
    const message = useRef(null);

    const showMessage = (severity, text) => {
        message.current.show({ severity, summary: text });
    }

    const createDish = (name, price, category, description = '', image) => {
        if (!name || !price || !category || !category.categoryId) {
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
                imageId: image.imageId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error al crear producto');
            }

            return response.json();
        }).then((data) => {
            getMenu();
        }).catch((error) => {
            showMessage('error', 'Error al crear el producto');
            console.error(error);
        });
    }

    function createCategory(name, icon) {
        if (!name || !icon) {
            return showMessage('error', 'Ingresa todos los valores');
        }

        // Tarea: Agregar un servicio que permita la creación de platos 
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
            if (response.ok) {
                return response.json();
            }
            throw new Error();
        }).then((data) => {
            getMenu();
        }).catch((error) => {
            showMessage('error', 'Error al crear el producto');
        });
    }

    useEffect(() => {
        function getRestaurant() {
            fetch(BASE_URL + '/restaurant/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                setMenuId(data.menuId);
                getMenu(data.menuId);
            }).catch(() => {
                message.current.show({ severity: 'error', summary: 'Ha ocurrido un error' });
            });
        }

        function getMenu(menuId) {
            fetch(BASE_URL + '/menu/get/' + menuId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                setMenu(data);
            }).catch(() => {
                message.current.show({ severity: 'error', summary: 'Ha ocurrido un error' });
            });
        }

        if (token) {
            getRestaurant();
        }
    }, [token]);

    return (<>
        <div className="bhome__container">
            <div className="bhome__manager-container">
                <Messages ref={message} />

                <Button
                    style={{ width: '90%', margin: '12px' }}
                    icon={<MdOutlineRestaurantMenu size={25} style={{ marginRight: '15px' }} />}
                    severity="success"
                    label="Visualizar Menú"
                    raised />
                <Button
                    style={{ width: '90%', margin: '12px' }}
                    icon={<FaChartPie size={25} style={{ marginRight: '15px' }} />}
                    severity="success"
                    label="Ver estadísticas de uso"
                    outlined
                    raised />
                <DishForm action={createDish} buttonText={'CREAR'} />

            </div>
            <div className="bhome__menu-sample">
                <CategoryForm action={createCategory} />
                <MenuSettings />
            </div>
            <div className="bhome__table">
                <CategoriesTable />
                <Table />
            </div>
        </div>
    </>);
}

export { Home }; 