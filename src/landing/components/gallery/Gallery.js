import React from "react";
import './gallery.scss';

const Gallery = ({ title, subtitle, description, images }) => {
    return(<div className="gallery__container">
        <div className="gallery__subtitle">
            <p>{ subtitle }</p>
        </div>
        <div className="gallery__title">
            <p>{ title }</p>
        </div>
        <div className="gellery__description">
            <p>{ description }</p>
        </div>
        <br></br>
        <div className="gallery__images-container">
            {images.map((item) => {
                return (<div key={item.name} className="gallery__image-item">
                    <img src={item.image} alt="Menu"/>
                    <p>{item.name}</p>
                </div>);
            })}
        </div>
    </div>);
}

export { Gallery }; 