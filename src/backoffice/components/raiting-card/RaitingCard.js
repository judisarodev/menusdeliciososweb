import React, { useEffect } from "react";
import './raitingCard.scss';
import { Rating } from 'primereact/rating';
import { ProgressBar } from 'primereact/progressbar';

const RaitingCard = ({ score, max, oneStarts, twoStarts, threeStarts, fourStarts, fiveStarts }) => {

    return (<div className="raiting-card__container">
        <div className="raiting-card__summary">
            <p className="raiting-card__score">{ score }</p>
            <Rating value={score} cancel={false} />
        </div>
        <div className="raiting-card__detail">
            <div>
                <p>1</p>
                <ProgressBar showValue={false} value={(oneStarts * 100) / max}></ProgressBar>
            </div>

            <div>
                <p>2</p>
                <ProgressBar showValue={false} value={(twoStarts * 100) / max}></ProgressBar>
            </div>

            <div>
                <p>3</p>
                <ProgressBar showValue={false} value={(threeStarts * 100) / max}></ProgressBar>
            </div>

            <div>
                <p>4</p>
                <ProgressBar showValue={false} value={(fourStarts * 100) / max}></ProgressBar>
            </div>

            <div>
                <p>5</p>
                <ProgressBar showValue={false} value={(fiveStarts * 100) / max}></ProgressBar>
            </div>
        </div>
    </div>);
}

export { RaitingCard };