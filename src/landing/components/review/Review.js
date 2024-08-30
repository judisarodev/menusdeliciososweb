import React from "react";
import './review.scss';
import { Carousel } from 'primereact/carousel';

const productTemplate = ({ title, description, author, image }) => {
    return(<div className="review__container">
        <div className="review__info">
            <div className="review__title">
                { title }
            </div>
            <div className="review__description">
                "{ description }"
            </div>
            <div>
                - { author } - 
            </div>
        </div>
        <div className="review__image">
            <img src={ image } alt="persona"/>
        </div>
    </div>);
}

const Review = ({reviews}) => {
    return(<div>
        <Carousel 
        value={reviews}
        numVisible={1} 
        numScroll={1} 
        verticalViewPortHeight="360px" 
        itemTemplate={productTemplate}
        autoplayInterval={10000} />
    </div>);
}

export { Review };