import React, { useState } from "react";
import './codes.scss';
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "primereact/button";
import { IoCloudDownloadOutline } from "react-icons/io5";


const Codes = () => {
    const [url, setUrl] = useState('https://www.facebook.com/');
    const [surveyUrl, setSurveyUrl] = useState('https://www.instagram.com/');

    return (<div className="codes__container">
        <div>
            <Button icon={<IoCloudDownloadOutline style={{marginRight: '12px'}} />} label="Descargar"/>
            <h2>MENÚ</h2>
            <QRCodeCanvas
                value={url}
                size={300}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
            />
            
        </div>
        <div>
            <Button icon={<IoCloudDownloadOutline style={{marginRight: '12px'}} size={20} />} label="Descargar"/>
            <h2>ENCUESTAS</h2>
            <QRCodeCanvas
                value={surveyUrl}
                size={300}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
            />
            
        </div>
    </div>);
}

export { Codes };