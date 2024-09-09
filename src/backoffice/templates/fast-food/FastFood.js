import React from "react";
import './fastFood.scss';
import { formatCurrency } from './../../../utils/currency/formatCurrency';
import { MdOutlineFileUpload } from "react-icons/md";
import { Skeleton } from "primereact/skeleton";

const FastFood = ({ title, subtitle, groupedDishes, editable = false }) => {
    return(<div className="fast-food__container">
        <h2>{subtitle}</h2>
        <h1>{title}</h1>
        {groupedDishes.map((group => {
            return(<FastFoodCategoryContainer group={group} editable={editable}/>);
        })) }
    </div>);
}

const FastFoodCategoryContainer = ({ group, editable }) => {
    const { categoryName, categoryIcon, categoryPicture, dishes } = group;

    return(
    <div className="fast-food-category__container">
        <div className="fast-food-category__info">
            <div className="fast-food-category__title">
                <div className="fast-food-category__name">
                    <p>{ categoryName }</p>
                </div>
                <div className="fast-food-category__icon">
                    <i>{ categoryIcon }</i>
                </div>
            </div>
            <div className="fast-food-cateogry__dishes">
                {dishes.map((dish) => {
                    return <FastFoodItem dish={dish} editable={editable}/>;
                })}
            </div>
        </div>
        <div className={ editable ? 'fast-food-category__image fast-food-category__image--editable' : 'fast-food-category__image' }>
            <img className="img" src={ categoryPicture } alt="Comida rápida"/>
            <div className="overlay">
                <div>
                    <MdOutlineFileUpload color="white" size={30}/>
                </div>
                Cambiar imagen
            </div>
        </div>
    </div>);
}

const FastFoodItem = ({ dish }) => {
    const { name, price, description } = dish;
    return(<div className="fast-food-item__container">
        <div className="fast-food-item__summary">
            <div className="fast-food-item__name">
                <p>{ name }</p>
            </div>

            <div className="fast-food-item__divider"></div>

            <div className="fast-food-item__price">
                <p>${ formatCurrency(price) }</p>
            </div>
        </div>
        <div className="fast-food-item__description">
            <p>{ description }</p>
        </div>
    </div>);
}

export { FastFood };