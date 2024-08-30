import React from "react";
import './infoCard.scss';
import { Button } from "primereact/button";

const InfoCard = ({ title, description, smallText }) => {
    return(
    <div className="info-card__container">
        <div className="info-card__info">
            <h2>{ title }</h2>
            <p>{ description }</p>
            <p>{ smallText }</p>
        </div>
        <div className="info-card__button">
            <Button label="Aplicar ahora" severity="warning"/>
        </div>
    </div>
    );
}

export { InfoCard }; 