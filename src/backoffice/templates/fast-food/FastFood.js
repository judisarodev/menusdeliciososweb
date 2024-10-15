import React from "react";
import './fastFood.scss';
import { formatCurrency } from './../../../utils/currency/formatCurrency';

const FastFood = ({ title, subtitle, menu, editable = false }) => {
    return(<div className="fast-food__container">
        <h2>{subtitle}</h2>
        <h1>{title}</h1>
        {menu && menu.map((group => {
            return(<FastFoodCategoryContainer group={group} editable={editable}/>);
        })) }
    </div>);
}

const FastFoodCategoryContainer = ({ group, editable }) => {
    const { name, icon, dishes } = group;

    return(
    <div className="fast-food-category__container">
        <div className="fast-food-category__info">
            <div className="fast-food-category__title">
                <div className="fast-food-category__name">
                    <p>{ name }</p>
                </div>
                <div className="fast-food-category__icon">
                    <i>{ icon }</i>
                </div>
            </div>
            <div className="fast-food-cateogry__dishes">
                {dishes.map((dish) => {
                    return <FastFoodItem dish={dish} editable={editable}/>;
                })}
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