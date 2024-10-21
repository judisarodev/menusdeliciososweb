import React, { useEffect, useState } from "react";
import { RaitingCard } from "../../components/raiting-card/RaitingCard";
import './survey.scss';
import { RespondentsCard } from "../../components/respondents-card/RespondentsCard";
import { SurveysTable } from "../../components/surveys-table/SurveysTable";

const Survey = () => {
    const [numberOfRespondants, setNumberOfRespondants] = useState(0);
    const [score, setScore] = useState(0);
    const [oneStarts, setOneStarts] = useState();
    const [twoStarts, setTwoStarts] = useState();
    const [threeStarts, seTthreeStarts] = useState();
    const [fourStarts, setFourStarts] = useState();
    const [fiveStarts, setFiveStarts] = useState();
    const [max, setMax] = useState(1);
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const scores = [1, 2, 3, 5, 10];
        setMax(getMax(scores));
        setOneStarts(scores[0]);
        setTwoStarts(scores[1]);
        seTthreeStarts(scores[2]);
        setFourStarts(scores[3]);
        setFiveStarts(scores[4]);
        setScore((sum(scores))/5);
        setNumberOfRespondants(54);
        setSurveys([{
            date: '2024-10-10',
            time: '10:00:12',
            score: 3,
            comments: 'Comida deliciosa'
        }, {
            date: '2024-10-10',
            time: '10:00:12',
            score: 3,
            comments: 'Comida deliciosa'
        }, {
            date: '2024-10-10',
            time: '10:00:12',
            score: 3,
            comments: 'Comida deliciosa'
        }]);
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

    return(<div className="survey-container">
        <div className="survey__cards-container">
            <RaitingCard 
            score={score} 
            max={max}
            oneStarts={oneStarts} 
            twoStarts={twoStarts} 
            threeStarts={threeStarts}
            fourStarts={fourStarts}
            fiveStarts={fiveStarts}/>
            <RespondentsCard numberOfRespondants={numberOfRespondants} />
        </div>
        <div className="survey__table-container">
            <SurveysTable surveys={surveys}/>
        </div>
    </div>);
}
export { Survey };