import React from "react";
import './block.scss';

const Block = ({ image, title, subtitle, description, imageLeftSide }) => {

    const leftSideStyles = {
        gridColumn: '1/2',
        gridRow: '1/2',
    }

    const rightSideStyles = {
        gridColumn: '2/3',
        gridRow: '1/2',
    }

    return(<div className="block__container">
        
        <div className="block__image" style={imageLeftSide ? leftSideStyles : rightSideStyles}>
            <img src={image} alt="info"/>
        </div>
        <div className="block__info" style={!imageLeftSide ? leftSideStyles : rightSideStyles}>
            <p className="block__info-subtitle">{subtitle}</p>
            <p className="block__info-title">{title}</p>
            <p className="block__info-description">{description}</p>
        </div>
    </div>);
}

export { Block }; 