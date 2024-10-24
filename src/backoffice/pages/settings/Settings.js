import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import './settings.scss';
import { Image } from "primereact/image";
const Settings = () => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [restaurantType, setRestaurantType] = useState('');
    const [restaurantTypes, setRestaurantTypes] = useState([]);

    const [addresses, setAddresses] = useState('');
    const [email, setEmail] = useState(''); 

    const [logo, setLogo] = useState(null);

    return (<>
        <div className="settings__container">
            <div>
                <div className="settings__panel">
                    <p className="settings__title">Editar restaurante</p>
                    <form className="settings__form_container">

                        <div className="settings__input-container">
                            <label>Nombre del restaurante *</label>
                            <InputText
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ingresa el nombre del producto" />
                        </div>

                        <div className="settings__input-container">
                            <label>Correo electrónico *</label>
                            <InputText
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ingresa el nombre del producto" />
                        </div>

                        <div className="settings__input-container">
                            <label>Número de celular *</label>
                            <InputText
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ingresa el nombre del producto" />
                        </div>

                        <div className="settings__input-container">
                            <label>País *</label>
                            <div className={'settings__input-container'}>
                                <Dropdown
                                    value={country}
                                    onChange={(e) => setCountry(e.value)}
                                    options={countries}
                                    optionLabel="name"
                                    placeholder="Selecciona una categoría" />
                            </div>
                        </div>

                        <br></br>
                        <Button
                            label={'ACTUALIZAR'}
                            onClick={(event) => {
                                event.preventDefault();
                            }
                            }
                        />
                    </form>
                </div>

                <div className="settings__panel">
                    <p className="settings__title">Logo del restaurante</p>
                    {logo && <Image width="200" src={ logo }/>}
                    {!logo && <p>Aún no has cargado el logo de tu restaurante.</p>}
                    <br></br>
                    <Button
                    label={!logo ? 'SUBIR' : 'CAMBIAR'}
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                    />
                </div>
            </div>
            <div>   
                <div className="settings__panel">
                    <p className="settings__title">Editar correo electrónico</p>
                    <form className="settings__form_container">
                        <div className="settings__input-container">
                            <label>Correo electrónico *</label>
                            <InputText
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ingresa el correo electónico" />
                        </div>
                        <br></br>
                        <Button
                        label={'ACTUALIZAR *'}
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                        />
                        <small>(*) Recibirás un e-mail de confirmación, debes abirir el link de confirmación para que la actualización sea exitosa. </small>
                    </form>
                </div>

                <div className="settings__panel">
                    <p className="settings__title">Actualizar contraseña</p>
                    <br></br>
                    <Button
                    label={'ENVIAR CORREO *'}
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                    />
                    <small>(*) Recibirás un e-mail con un link que te permitirá cambiar tu contraseña. </small>
                </div>
            </div>
        </div>
    </>);
}

export { Settings };