import React, { useEffect, useState } from "react";
import './raitingCard.scss';
import { Rating } from 'primereact/rating';
import { ProgressBar } from 'primereact/progressbar';

const RaitingCard = () => {
    const [score, setScore] = useState(0);
    const [oneStarts, setOneStarts] = useState();
    const [twoStarts, setTwoStarts] = useState();
    const [threeStarts, seTthreeStarts] = useState();
    const [fourStarts, setFourStarts] = useState();
    const [fiveStarts, setFiveStarts] = useState();
    const [max, setMax] = useState(1);

    useEffect(() => {
        const scores = [1, 2, 3, 5, 10];

        setMax(getMax(scores));
        setOneStarts(scores[0]);
        setTwoStarts(scores[1]);
        seTthreeStarts(scores[2]);
        setFourStarts(scores[3]);
        setFiveStarts(scores[4]);
        setScore((sum(scores))/5);
    }, []);

    function getMax(arr){
        let max = 0;
        for(let i = 0; i < arr.length; i++){
            if(arr[i] > max){
                max = arr[i];
            }
        }
        return max;
    }

    function sum(arr){
        return arr.reduce((acc, value) => {
            return acc + value
        }, 0);
    }

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