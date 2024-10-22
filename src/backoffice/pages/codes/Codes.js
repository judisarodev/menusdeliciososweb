import React, { useContext, useEffect, useState } from "react";
import './codes.scss';
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "primereact/button";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import { MenuContext } from "../../context/restaurant/MenuContext";


const Codes = () => {
    const menuContext = useContext(MenuContext);
    const { menu } = menuContext;

    const PAGE_URL = 'http://localhost:3000';

    const [url, setUrl] = useState(null);
    const [surveyUrl, setSurveyUrl] = useState(null);

    useEffect(() => {
        setUrl(`${PAGE_URL}${menu.url}`);
        setSurveyUrl(`${PAGE_URL}${menu.url}/encuesta`);
    }, [menu]);

    return (<div className="codes__container">
        <div>
            {url && <div>
                <Button icon={<IoCloudDownloadOutline style={{ marginRight: '12px' }} />} label="Descargar" />
                <h2>MENÚ</h2>
                <QRCodeCanvas
                    value={url}
                    size={300}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                />
                <p>{url}</p></div>}       
                {!surveyUrl && <div><MdError size={30} /> <h2> No hay un código QR disponible</h2></div>}
        </div>
        <div>
            {surveyUrl && <div>
                <Button icon={<IoCloudDownloadOutline style={{ marginRight: '12px' }} size={20} />} label="Descargar" />
                <h2>ENCUESTAS</h2>
                <QRCodeCanvas
                    value={surveyUrl}
                    size={300}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                />
                <p>{surveyUrl}</p></div>}
            {!surveyUrl && <div><MdError size={30} /> <h2>No hay un código QR disponible</h2></div>}
        </div>
    </div>);
}

export { Codes };