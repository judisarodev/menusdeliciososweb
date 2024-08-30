import React from "react";
import './prices.scss';
import colombianFlag from './../../../assets/home/colombia-flag.png'
import { IoMdCheckmark } from "react-icons/io";
import { Button } from 'primereact/button';


const Plan = ({ name, amount, savings }) => {

    const services = [
        'Menús personalizados',
        'Código QR para clientes',
        'Soporte técnico y comercial',
        'Encuestas de satisfacción',
        'Código QR para encuestas de satisfacción',
    ];

    return(
        <div className="plan__container">
            <div className="plan__title">
                <p>{ name }</p>
            </div>

            <div className="plan__amount">
                <img className="plan__amount-currency-fag" src={colombianFlag} alt="Bandera colombia" />
                <p >{ amount }</p>
            </div>

            <div className="plan__services">
                {services.map((service, _index) => {
                    return  <p key={_index}><span><IoMdCheckmark  /></span> {service}</p>
                })}
            </div>

            <Button className="plan__button" label="Empezar ahora" severity="warning" outlined  />   
        </div>
    );
}

const Prices = () => {

    const plans = [{
        savings: null,
        name: 'Plan mensual',
        amount: '$32.000 / mes',
    },{
        savings: 'Ahorras dos meses',
        name: 'Plan anual',
        amount: '$320.000 / año',
    }];
    return(<div className="prices__container">
        <div className="prices__plans">
            {plans.map((plan)=>{
                return <Plan key={plan.name} name={plan.name} amount={plan.amount} savings={plan.savings}/>
            })}
        </div>
    </div>);
}
export { Prices }; 