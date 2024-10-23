import React, { useContext, useEffect, useState } from "react";
import { RaitingCard } from "../../components/raiting-card/RaitingCard";
import './survey.scss';
import { RespondentsCard } from "../../components/respondents-card/RespondentsCard";
import { SurveysTable } from "../../components/surveys-table/SurveysTable";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { MenuContext } from "../../context/restaurant/MenuContext";

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

    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;
    const menuContext = useContext(MenuContext);
    const { restaurant } = menuContext;

    // Env
    const BASE_URL = process.env.REACT_APP_URL;

    const scores = [0, 0, 0, 0, 0];

    useEffect(() => {
        fetch(BASE_URL + '/survey/get-all/' + restaurant.restaurantId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error al consultar las imágenes');
        }).then((data) => {
            for (const survey of data.surveys) {
                scores[survey.score - 1]++;
            }
            setMax(getMax(scores));
            
            setOneStarts(scores[0]);
            setTwoStarts(scores[1]);
            seTthreeStarts(scores[2]);
            setFourStarts(scores[3]);
            setFiveStarts(scores[4]);
            setScore(((sum(scores)) / data.totalRecords).toFixed(1));
            setNumberOfRespondants(data.totalRecords);
            setSurveys(data.surveys);
        }).catch((error) => {
            console.error(error);
        });
    
    }, []);


    function getMax(arr) {
        let max = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    function sum(arr) {
        let sum = 0;
        for(let i = 0; i < arr.length; i++){
            sum += (arr[i] * (i + 1));
        }
        return sum.toFixed(1);
    }

    return (<div className="survey-container">
        <div className="survey__cards-container">
            <RaitingCard
                score={score}
                oneStarts={oneStarts}
                twoStarts={twoStarts}
                threeStarts={threeStarts}
                fourStarts={fourStarts}
                fiveStarts={fiveStarts} 
                numberOfRespondants={numberOfRespondants}/>
            <RespondentsCard numberOfRespondants={numberOfRespondants} />
        </div>
        <div className="survey__table-container">
            <SurveysTable surveys={surveys} />
        </div>
    </div>);
}
export { Survey };