import React from "react";
import { RaitingCard } from "../../components/raiting-card/RaitingCard";
import './survey.scss';

const Survey = () => {
    return(<div className="survey-container">
        <div className="survey__cards-container">
            <RaitingCard />

        </div>
    </div>);
}
export { Survey };