import { Rating } from "primereact/rating";
import React, { useState } from "react";
import { InputTextarea } from 'primereact/inputtextarea';
import './answerSurvey.scss';
import { Button } from 'primereact/button';

const AnswerSurvey = () => {
    const [score, setScore] = useState(0);
    const [comments, setComments] = useState('');

    return (<div className="answer-survey__conatainer">
        <div className="answer-survey__form"> 
            <h1>Encuesta de satisfacción</h1>
            <p>Del 1 al 5 ¿Qué tan satisfactoria fue tu experiencia en el restaurante?</p>
            <Rating className="custom-rating" value={score} cancel={false} onChange={(e) => setScore(e.value)} />
            <br></br>
            <p>Cuéntanos más sobre tu experiencia (optional)</p>
            <InputTextarea value={comments} onChange={(e) => setComments(e.target.value)} rows={5} cols={30} />
            <Button label="Enviar"/>
        </div>
    </div>);
}

export { AnswerSurvey }; 