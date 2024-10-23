import { Rating } from "primereact/rating";
import React, { useState } from "react";
import { InputTextarea } from 'primereact/inputtextarea';
import './answerSurvey.scss';
import { Button } from 'primereact/button';

const AnswerSurvey = () => {
    const [score, setScore] = useState(0);
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const [comments, setComments] = useState('');

    function submitSurvey() {
        setWasSubmitted(true);
    }

    return (<div className="answer-survey__conatainer">
        <div className="answer-survey__form">
            {!wasSubmitted &&
                <div>
                    <h1>Encuesta de satisfacción</h1>
                    <p>¿Qué tan satisfactoria fue tu experiencia en el restaurante?</p>
                    <Rating className="custom-rating" value={score} cancel={false} onChange={(e) => setScore(e.value)} />
                    <br></br>
                    <p>Cuéntanos más sobre tu experiencia (optional)</p>
                    <InputTextarea value={comments} onChange={(e) => setComments(e.target.value)} rows={5} cols={30} />
                    <Button label="Enviar" onClick={submitSurvey}/>
                </div>}

            {wasSubmitted && <div style={{textWrap: 'wrap', textAlign: 'center'}}>
                <h1>Gracias por enviar tu opinión</h1>
            </div>}
        </div>

    </div>);
}

export { AnswerSurvey }; 