import { Rating } from "primereact/rating";
import { InputTextarea } from 'primereact/inputtextarea';
import './answerSurvey.scss';
import { Button } from 'primereact/button';
import backgroundImage from './../../../assets/survey/survey_background.jpg'
import { useParams } from "react-router-dom";
import { useState } from "react";

const AnswerSurvey = () => {
    const [score, setScore] = useState(0);
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const [comments, setComments] = useState('');

    const { url } = useParams();

    // Env
    const BASE_URL = process.env.REACT_APP_URL;

    function submitSurvey() {
        fetch(BASE_URL + '/client/make-survey/' + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                score, 
                comments: comments || '',
            })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error al realizar encuesta');
        }).then((data) => {
            setWasSubmitted(true);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (<div className="answer-survey__conatainer" style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
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