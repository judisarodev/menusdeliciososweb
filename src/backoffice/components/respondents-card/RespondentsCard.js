import React from "react";
import './respondentsCard.scss';

const RespondentsCard = ({ numberOfRespondants }) => {
    return (<div className="respondent-card__container">
        <p className="respondent-card__title">{ numberOfRespondants }</p>
        <p>Clientes han respondido la cuesta</p>
    </div>);
}

export { RespondentsCard }; 