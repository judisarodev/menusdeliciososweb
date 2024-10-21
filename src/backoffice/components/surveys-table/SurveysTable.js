import React from "react";
import './surveysTable.scss';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const tableTitleTemplate = (text) => {
    return <h2>{text}</h2>
}


const SurveysTable = ({ surveys }) => {
    return(<div className="surveys-table__container">
        <DataTable value={surveys} header={tableTitleTemplate('Encuestas')} tableStyle={{ minWidth: '50rem' }} emptyMessage={'Aún no hay encuestas'} size={'small'} stripedRows={true} >
            <Column style={{ width: '20%' }} field="date" header="Fecha"></Column>
            <Column style={{ width: '20%' }} field="time" header="Hora"></Column>
            <Column style={{ width: '20%' }} field="score" header="Puntaje"></Column>
            <Column style={{ width: '40%' }} field="comments" header="Comentarios"></Column>
        </DataTable>
    </div>);
}

export { SurveysTable };