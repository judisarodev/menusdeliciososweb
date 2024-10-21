import React from "react";
import './respondentsCard.scss';
import { FaRegUser } from "react-icons/fa";

const RespondentsCard = ({ numberOfRespondants }) => {
    return (<div className="respondent-card__container">
        <div className="respondent-card__icon">
            <FaRegUser size={20} color="#06b6d4"/>
        </div>
        <p className="respondent-card__title">{ numberOfRespondants }</p>
        <p>Clientes han tomado la cuesta</p>
    </div>);
}

export { RespondentsCard }; 