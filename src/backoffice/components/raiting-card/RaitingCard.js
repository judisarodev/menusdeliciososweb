import React from "react";
import './raitingCard.scss';
import { Rating } from 'primereact/rating';
import { ProgressBar } from 'primereact/progressbar';
import { FaChartBar } from "react-icons/fa";
import { Tooltip } from 'primereact/tooltip';

const RaitingCard = ({ score, oneStarts, twoStarts, threeStarts, fourStarts, fiveStarts, numberOfRespondants }) => {

    return (<div className="raiting-card__container">
        <div className="raiting-card__icon">
            <FaChartBar size={20} color="#06b6d4" />
        </div>
        <div className="raiting-card__summary">
            <p className="raiting-card__score">{score}</p>
            <Rating value={score} cancel={false} />
        </div>
        <div className="raiting-card__detail">
            <Rate label={1} className={'raiting-card__one-starts'} starts={oneStarts} numberOfRespondants={numberOfRespondants}/>   
            <Rate label={2} className={'raiting-card__two-starts'} starts={twoStarts} numberOfRespondants={numberOfRespondants}/>
            <Rate label={3} className={'raiting-card__three-starts'} starts={threeStarts} numberOfRespondants={numberOfRespondants}/>
            <Rate label={4} className={'raiting-card__four-starts'} starts={fourStarts} numberOfRespondants={numberOfRespondants}/>
            <Rate label={5} className={'raiting-card__five-starts'} starts={fiveStarts} numberOfRespondants={numberOfRespondants}/>
        </div>
    </div>);
}

const Rate = ({className, starts, label, numberOfRespondants}) => {
    return (<>
        <Tooltip position="left" target={'.' + className} content={`${starts} votaciones`} />
        <div>
            <p>{label}</p>
            <ProgressBar className={className} showValue={false} value={(starts * 100) / numberOfRespondants}></ProgressBar>
        </div>
    </>
    );
}

export { RaitingCard };