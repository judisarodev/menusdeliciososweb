import React, { useContext, useEffect, useRef, useState } from "react";
import './login.scss';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';    
import { Password } from 'primereact/password';
import logo from './../../../assets/logo/white.png';
import { Checkbox } from 'primereact/checkbox';
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

const Login = ({ loginPage = true }) => {
    // Data
    const pages = ['Ingresar', 'Registrarse'];
    const BASE_URL = process.env.REACT_APP_URL;

    // Context
    const tokenContext = useContext(TokenContext);
    const { setToken, token } = tokenContext;

    // States
    const [page, setPage] = useState(loginPage ? pages[0] : pages[1]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [addressDetails, setAddressDetails] = useState('');
    const [checked, setChecked] = useState(false);
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [type, setType] = useState("");
    const [types, setTypes] = useState([]);
    
    // Navigation
    const navigate = useNavigate();

    // References 
    const message = useRef(null);

    const getCountries = () => {
        fetch(BASE_URL + '/country/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Error al consultar los países');
        }).then((c) => {
            setCountries(c);
        }).catch((error) => {
            message.current.show({ severity: 'error', summary: 'Ha ocurrido un error, intenta más tarde' });
        });
    }

    const getTypes = () => {
        fetch(BASE_URL + '/restaurant-type/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Error al consultar los tipos de restaurante');
        }).then((c) => {
            setTypes(c);
        }).catch((error) => {
            message.current.show({ severity: 'error', summary: 'Ha ocurrido un error, intenta más tarde' });
        });
    }

    const validateCreateComopanyForm = () => {
        if(restaurantName && email && phoneNumber && address && password && confirmPassword){
            if(password === confirmPassword){
                if(checked === true){
                    const payload = {
                        name: restaurantName,
                        email, 
                        password,
                        phoneNumber,
                        address,
                        addressDetails,
                        countryId: country.countryId,
                        restaurantTypeId: type.restaurantTypeId,
                    }
                    createCompany(payload);
                }else{
                    message.current.show({severity: 'warn', summary: 'Debes aceptar los términos y condiciones'});
                }
            }else {
                message.current.show({severity: 'warn', summary: 'Las contraseñas ingresadas no coinciden'});
            }
        }else{
            message.current.show({severity: 'warn', summary: 'Debes ingresar todos los campos'});
        }
    }

    const createCompany = (payload) => {
        fetch(BASE_URL + '/restaurant/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(payload),
        }).then((response) => {
            if(response.ok){
                return response.json();
            }else {
                throw new Error(response.status);
            }
        }).then((data) => {
            const { jwt } = data;
            setToken(jwt);
            sessionStorage.setItem('token', jwt);
            navigate('/panel');
        }).catch((error) => {
            console.log(error);
            if(error.message === '409'){
                message.current.show({ severity: 'error', summary: 'El correo ingresado ya está registrado' }); 
            }else if(error.message === '401'){
                message.current.show({ severity: 'error', summary: 'Ingresa todos los campos' }); 
            }else {
                message.current.show({ severity: 'error', summary: 'Ha ocurrido un error' }); 
            }
        });
    }

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

    const setView = (e) => {
        setPage(e.value);
        if(e.value === pages[1] && (countries.length === 0 || types.length === 0 )){
            getCountries();
            getTypes();
        }
    }


    return(<div className="login__main-container">
        <img src={logo} alt="logo"/>
        <Toast ref={message}/>
        <div className="login__container">
            <SelectButton value={page} onChange={(e) => setView(e)} options={pages} />
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
                        <label htmlFor="username">Detalles de la dirección (opcional)</label>
                        <InputText value={addressDetails} onChange={(e) => setAddressDetails(e.target.value)} />
                    </div>
                    <div className="login__input-item">
                        <label htmlFor="country">País</label>
                        <Dropdown
                        value={country}
                        options={countries}
                        onChange={(e) => setCountry(e.value)}
                        optionLabel="name"
                        placeholder="Selecciona un país"
                        />
                    </div>
                    <div className="login__input-item">
                        <label htmlFor="type">Tipo de restaurante</label> 
                        <Dropdown 
                        value={type}
                        options={types}
                        onChange={(e) => setType(e.value)}
                        optionLabel="name"
                        placeholder="Selecciona el tipo de restaurante"
                        />
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
            <Button label="Siguiente" severity="primary" onClick={page === pages[0] ? loginRequeset : validateCreateComopanyForm } />    
        </div>
    </div>);
}
export {Login};