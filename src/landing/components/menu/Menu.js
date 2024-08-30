import React, { useEffect, useState } from "react";
import { Menubar } from 'primereact/menubar';
import './menu.scss';
import blackLogo from './../../../assets/logo/white-text.png';
import whiteLogo from './../../../assets/logo/black-text.png';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Menu = ({setSelectedMenuItem}) => {

    const [isAtTop, setIsAtTop] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        function handleScroll(){
            if(window.scrollY < 50){
                setIsAtTop(true);
            }else{
                setIsAtTop(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []); 

    const items = [
        {
            id: 1,
            label: 'Inicio',
            command: () => setSelectedMenuItem(0),
        },
        {
            id: 2,
            label: 'Plantillas',
            command: () => setSelectedMenuItem(1),
        },
        {
            id: 3,
            label: 'Planes',
            command: () => setSelectedMenuItem(2),
        }
    ];

    const icon = <img className="menu__icon" src={ isAtTop ? blackLogo : whiteLogo } width={'90px'} alt="Logo"/>;
    const loginButton = <Button onClick={() => navigate('/login')} className="menu__button" label="Ingresar" severity="warning"  outlined  />
    return(<>
        <nav>
            <Menubar className={isAtTop ? 'menu__standard-color' : 'menu__light-color'} start={icon} end={loginButton} model={items}/>
        </nav>
    </>);
}

export { Menu }; 