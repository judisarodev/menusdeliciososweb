import React from "react";
import './surveysTable.scss';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const tableTitleTemplate = (text) => {
    return <h2>{text}</h2>
}

function formatDateTime(dateString) {
    const date = new Date(dateString);

    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', opcionesFecha);

    const opcionesHora = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', opcionesHora);

    return { date: formattedDate, time: formattedTime };
}

const dateTemplate = (rowContent) => {
    const { date } = formatDateTime(rowContent.time);
    return <p>{ date }</p>;
}

const timeTemplate = (rowContent) => {
    const { time } = formatDateTime(rowContent.time);
    return <p>{ time }</p>;
}

const SurveysTable = ({ surveys }) => {
    return(<div className="surveys-table__container">
        <DataTable value={surveys} header={tableTitleTemplate('Encuestas')} tableStyle={{ minWidth: '50rem' }} emptyMessage={'Aún no hay encuestas'} size={'small'} stripedRows={true} >
            <Column style={{ width: '20%' }} body={dateTemplate} header="Fecha"></Column>
            <Column style={{ width: '20%' }} body={timeTemplate} header="Hora"></Column>
            <Column style={{ width: '20%' }} field="score" header="Puntaje"></Column>
            <Column style={{ width: '40%' }} field="comments" header="Comentarios"></Column>
        </DataTable>
    </div>);
}

export { SurveysTable };