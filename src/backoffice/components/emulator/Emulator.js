import React, { useContext, useEffect, useState } from "react";
import './emulator.scss';
import { FastFood } from "../../templates/fast-food/FastFood";
import { MenuContext } from "../../context/restaurant/MenuContext";

const Emulator = () => {

    const menuContext = useContext(MenuContext);
    const { menu } =  menuContext; 

    return (
        <div className="emulator__container">
            <FastFood 
            title={'Menú'} 
            subtitle={'Bienvenido'}
            menu={menu.categories}
            editable={true}/>
        </div>
    );
}

export { Emulator }; 