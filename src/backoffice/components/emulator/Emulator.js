import React from "react";
import './emulator.scss';
import { FastFood } from "../../templates/fast-food/FastFood";
import { FaHamburger } from "react-icons/fa";
import hamburguerImage from '../../../assets/fastfood/hamburguer.jpg';
import pizzaImage from '../../../assets/fastfood/pizza.jpg';
import hotdogImage from '../../../assets/fastfood/hotdog.png';

const Emulator = () => {

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