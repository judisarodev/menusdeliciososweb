import React, { useContext, useEffect, useState } from "react";
import './emulator.scss';
import { FastFood } from "../../templates/fast-food/FastFood";
import { FaHamburger } from "react-icons/fa";
import hamburguerImage from '../../../assets/fastfood/hamburguer.jpg';
import { CategoriesContext } from "../../context/restaurant/CategoriesContext";
import { ProductsContext } from "../../context/restaurant/ProductsContext";

const Emulator = () => {

    const categoriesContext = useContext(CategoriesContext);
    const { categories } =  categoriesContext; 

    const productsContext = useContext(ProductsContext);
    const { products } = productsContext;

    // Satates
    const [groupedDishes, setGroupedDishes] = useState([]);

    useEffect(() => {
        const getGroupedDishes = () => {
            const arr = [];
            for(const category of categories){
                const item = {
                    categoryName: category.name,
                    categoryIcon: <FaHamburger />, // category.icon;
                    categoryPicture: hamburguerImage, // category.image;
                    dishes: [],
                }
                for(const product of products){
                    if(product.category.categoryId === category.categoryId){
                        item.dishes.push({
                            name: product.name,
                            price: product.price,
                            description: product.description
                        });
                    }
                }
                if(item.dishes.length > 0){
                    arr.push(item); 
                }
            }
            setGroupedDishes(arr); 
        }

        if(products && categories){
            getGroupedDishes();
        }
    }, [products, categories]);

    /*
    const groupedDishes = [{
        categoryName: 'Hamburguesas',
        categoryIcon: <FaHamburger />,
        categoryPicture: hamburguerImage,
        dishes: [{
            name: 'Clásica',
            price: 10000,
            description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500'
        }, {
            name: 'Mexicana',
            price: 20000,
            description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500'
        }]
    }, {
        categoryName: 'Pizzas',
        categoryIcon: <FaHamburger />,
        categoryPicture: pizzaImage,
        dishes: [{
            name: 'Con queso',
            price: 10000,
            description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500'
        }, {
            name: 'Italiana',
            price: 20000,
            description: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500',
        }]
    }, {
        categoryName: 'Perros Calientes',
        categoryIcon: <FaHamburger />,
        categoryPicture: hotdogImage,
        dishes: [{
            name: 'Con queso',
            price: 10000
        }, {
            name: 'Italiana',
            price: 20000
        }]
    },];
    */

    return (
        <div className="emulator__container">
            <FastFood 
            title = {'Menú'} 
            subtitle = {'Bienvenido'}
            groupedDishes = {groupedDishes}
            editable={true}/>
        </div>
    );
}

export { Emulator }; 