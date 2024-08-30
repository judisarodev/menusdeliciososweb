import React, { useState } from "react";
import './login.scss';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';    
import { Password } from 'primereact/password';
import logo from './../../../assets/logo/white.png';
import { Checkbox } from 'primereact/checkbox';
import { useNavigate } from "react-router-dom";


const Login = ({ loginPage = true }) => {
    const pages = ['Ingresar', 'Registrarse'];
    const [page, setPage] = useState(loginPage ? pages[0] : pages[1]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const loginRequeset = () => {
        fetch(process.env.API_URL, {
            method: 'POST',
            body: {
                email,
                password
            }
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            }
        }).then((data) => {
            console.log(data);
        });
    }


    return(<div className="login__main-container">
        <img src={logo} alt="logo"/>
        <div className="login__container">
            <SelectButton value={page} onChange={(e) =>setPage(e.value)} options={pages} />
            {page === pages[0] ?
            <form>
                <div className="login__input-item">
                    <label htmlFor="username">Correo electrónico o Celular</label>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="login__input-item">
                    <label htmlFor="username">Contraseña</label>
                    <Password
                        toggleMask 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        feedback={false} 
                        tabIndex={1} />
                </div>
            </form>
            :
            <div> 
                <form id="login__register-form">
                    <div className="login__input-item">
                        <label htmlFor="username">Nombre del restaurante</label>
                        <InputText value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
                    </div>
                    <div className="login__input-item">
                        <label htmlFor="username">Correo electrónico</label>
                        <InputText value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="login__input-item">
                        <label htmlFor="username">Número de celular</label>
                        <InputText value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="login__input-item">
                        <label htmlFor="username">Dirección</label>
                        <InputText value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="login__input-item">
                        <label htmlFor="username">Contraseña</label>
                        <Password
                            toggleMask 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            promptLabel="Ingresa contraseña" 
                            weakLabel="Insegura" 
                            mediumLabel="Media" 
                            strongLabel="Fuerte"/>
                    </div>
                    <div className="login__input-item">
                        <label htmlFor="username">Confirmar contraseña</label>
                        <Password
                            toggleMask 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            promptLabel="Ingresa contraseña" 
                            weakLabel="Insegura" 
                            mediumLabel="Media" 
                            strongLabel="Fuerte"/>
                    </div>
                </form>
                <div className="login__terms">
                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                    <p>Acepto los <span onClick={() => navigate('/terms')}>términos y condiciones</span> para el tratamiento de datos personales.</p>
                </div>
            </div>}
            <Button label="Siguiente" severity="primary" onClick={() => navigate('/panel')} />    
        </div>
    </div>);
}
export {Login};