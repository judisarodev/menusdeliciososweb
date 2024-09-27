import React, { useContext, useRef, useState } from "react";
import './login.scss';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';    
import { Password } from 'primereact/password';
import logo from './../../../assets/logo/white.png';
import { Checkbox } from 'primereact/checkbox';
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { Messages } from 'primereact/messages';

const Login = ({ loginPage = true }) => {
    // Data
    const pages = ['Ingresar', 'Registrarse'];
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { setToken } = tokenContext;

    // States
    const [page, setPage] = useState(loginPage ? pages[0] : pages[1]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [checked, setChecked] = useState(false);
    
    // Navigation
    const navigate = useNavigate();

    // References 
    const message = useRef(null);

    const loginRequeset = () => {
        if(username && password){
            const credentials = btoa(`${username}:${password}`); 

            fetch(BASE_URL + '/restaurant/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + credentials,
                },
            })
            .then((response) => {
                const statusCode = response.status;
                if(response.ok){
                    return response.json();
                }
                if(statusCode === 401){
                    throw new Error('No autorizado');
                }
            }).then((data) => {
                if(data.jwt){
                    setToken(data.jwt);
                    sessionStorage.setItem('token', data.jwt);
                    navigate('/panel');
                }
            }).catch((error) => {
                message.current.show({severity: 'warn', summary: 'Credenciales incorrectas'});
                console.error(error.message);
            });
        }else{
            message.current.show({severity: 'warn', summary: 'Ingresa tu usuario y contraseña'});
        }
    }


    return(<div className="login__main-container">
        <img src={logo} alt="logo"/>
        <Messages ref={message} />
        <div className="login__container">
            <SelectButton value={page} onChange={(e) =>setPage(e.value)} options={pages} />
            {page === pages[0] ?
            <form>
                <div className="login__input-item">
                    <label htmlFor="username">Correo electrónico</label>
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
            <Button label="Siguiente" severity="primary" onClick={loginRequeset} />    
        </div>
    </div>);
}
export {Login};