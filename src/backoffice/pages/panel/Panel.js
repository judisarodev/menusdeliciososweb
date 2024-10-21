import React, { useState } from "react";
import './panel.scss';
import { Menu } from 'primereact/menu';
import { CiHome } from "react-icons/ci";
import { FcSurvey } from "react-icons/fc";
//import { CiMoneyBill } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { FaQrcode } from "react-icons/fa";
import { Home } from "../home/Home";
import logo from './../../../assets/logo/black-text.png';
import { Survey } from "../survey/Survey";
import { Codes } from "../codes/Codes";
const Panel = () => {

    const homeView = <Home />;
    const surveyView = <Survey />;
    const CodesView = <Codes />;
    //const billView = "Bills";
    const settingsView = "settings";
    
    const [view, setView] = useState(homeView);

    const menuItems = [{
        template: () => {
            return(<img width={'100px'} src={logo} alt="logo"/>);
        }
    },{
        label: 'Incio',
        icon: <CiHome size={20}/>,
        command: () => setView(homeView), 
    }, {
        label: 'Encuesta',
        icon: <FcSurvey size={20}/>,
        command: () => setView(surveyView), 
    }, {
        label: 'Códigos QR',
        icon: <FaQrcode  size={20}/>,
        command: () => setView(CodesView), 
    }, /*{
        label: 'Facturas',
        icon: <CiMoneyBill size={20}/>,
        command: () => setView(billView), 
    }, */{
        label: 'Configuración',
        icon: <CiSettings size={20}/>,
        command: () => setView(settingsView), 
    }];

    return(<>
        <div className="backoffice-menu">
            <Menu model={menuItems}/>
            <div>
                {view}
            </div>
        </div>
    </>);
}

export { Panel }; 