import React from "react";
import './raitingCard.scss';
import { Rating } from 'primereact/rating';
import { ProgressBar } from 'primereact/progressbar';
import { FaChartBar } from "react-icons/fa";
import { Tooltip } from 'primereact/tooltip';

const RaitingCard = ({ score, max, oneStarts, twoStarts, threeStarts, fourStarts, fiveStarts }) => {

    return (<div className="raiting-card__container">
        <div className="raiting-card__icon">
            <FaChartBar size={20} color="#06b6d4" />
        </div>
        <div className="raiting-card__summary">
            <p className="raiting-card__score">{score}</p>
            <Rating value={score} cancel={false} />
        </div>
        <div className="raiting-card__detail">
            <Rate className={'raiting-card__one-starts'} starts={oneStarts} max={max}/>   
            <Rate className={'raiting-card__two-starts'} starts={twoStarts} max={max}/>
            <Rate className={'raiting-card__three-starts'} starts={threeStarts} max={max}/>
            <Rate className={'raiting-card__four-starts'} starts={fourStarts} max={max}/>
            <Rate className={'raiting-card__five-starts'} starts={fiveStarts} max={max}/>
        </div>
    </div>);
}

const Rate = ({className, starts, max}) => {
    return (<>
        <Tooltip position="left" target={'.' + className} content={`${starts} votaciones`} />
        <div>
            <p>5</p>
            <ProgressBar className={className} showValue={false} value={(starts * 100) / max}></ProgressBar>
        </div>
    </>
    );
}

export { RaitingCard };