import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useContext, useEffect, useState } from "react";
import './settings.scss';
import { Image } from "primereact/image";
import { MenuContext } from "../../context/restaurant/MenuContext";
import { TokenContext } from "../../context/token/TokenContextProvider";
const Settings = () => {

    const BASE_URL = process.env.REACT_APP_URL;

    const menuContext = useContext(MenuContext);
    const { restaurant, countries, restaurantTypes } = menuContext;

    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const [restaurantId, setRestaurantId] = useState();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [restaurantType, setRestaurantType] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if (restaurant) {
            setRestaurantId(restaurant.restaurantId);
            setName(restaurant.name);
            setPhoneNumber(restaurant.phoneNumber);
            setCountry(restaurant.country);
            setRestaurantType(restaurant.restaurantType);
            setAddresses(restaurant.addresses);
            setEmail(restaurant.email);
            setLogo(restaurant.logo);
        }
    }, [restaurant]);

    const handleAddressChange = (index, newValue) => {
        const updatedAddresses = addresses.map((address, i) =>
            i === index ? { ...address, address: newValue } : address
        );
        setAddresses(updatedAddresses);
    };

    const addAddress = () => {
        setAddresses([...addresses, { address: '', addressId: Date.now() }]);
    };

    const removeAddress = (index) => {
        setAddresses(addresses.filter((_, i) => i !== index));
    };

    const updateRestaurant = () => {
        fetch(BASE_URL + '/restaurant/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                name,
                phoneNumber,
                countryId: country.countryId,
                restaurantTypeId: restaurantType.restaurantTypeId
            }),
        }).then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(response.status);
        }).then((data) => {
            
        }).catch((error) => {
            console.log(error);
            
        });
    }

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
                                placeholder="Ingresa el nombre del restaurante" />
                        </div>

                        <div className="settings__input-container">
                            <label>Número de celular *</label>
                            <InputText
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Ingresa número de celular" />
                        </div>

                        <div className="settings__input-container">
                            <label>País *</label>
                            <div className={'settings__input-container'}>
                                <Dropdown
                                    value={country}
                                    onChange={(e) => setCountry(e.value)}
                                    options={countries}
                                    optionLabel="name"
                                    placeholder="Selecciona un país" />
                            </div>
                        </div>

                        <div className="settings__input-container">
                            <label>Tipo de restaurante *</label>
                            <div className={'settings__input-container'}>
                                <Dropdown
                                    value={restaurantType}
                                    onChange={(e) => setRestaurantType(e.value)}
                                    options={restaurantTypes}
                                    optionLabel="name"
                                    placeholder="Selecciona un país" />
                            </div>
                        </div>

                        <br></br>
                        <Button
                            label={'ACTUALIZAR'}
                            severity="secondary"
                            outlined
                            onClick={(event) => {
                                event.preventDefault();
                                updateRestaurant();
                            }}
                        />
                    </form>
                </div>

                <div className="settings__panel">
                    <p className="settings__title">Logo del restaurante</p>
                    {logo && <Image width="200" src={logo} />}
                    {!logo && <p>Aún no has cargado el logo de tu restaurante.</p>}
                    <br></br>
                    <Button
                        label={!logo ? 'SUBIR' : 'CAMBIAR'}
                        outlined
                        severity="secondary"
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                    />
                </div>

                <div className="settings__panel">
                    <p className="settings__title">Actualizar contraseña</p>
                    <br></br>
                    <Button
                        label={'ENVIAR CORREO *'}
                        severity="secondary"
                        outlined
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                    />
                    <small>(*) Recibirás un email con un link que te permitirá cambiar tu contraseña. </small>
                </div>
            </div>
            <div>
                <div className="settings__panel">
                    <p className="settings__title">Editar correo electrónico</p>
                    <form className="settings__form_container">
                        <div className="settings__input-container">
                            <label>Correo electrónico *</label>
                            <InputText
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa el correo electónico" />
                        </div>
                        <br></br>
                        <Button
                            label={'ACTUALIZAR *'}
                            severity="secondary"
                            outlined
                            onClick={(event) => {
                                event.preventDefault();
                            }}
                        />
                        <small>(*) Recibirás un e-mail de confirmación, debes abirir el link de confirmación para que la actualización sea exitosa. </small>
                    </form>
                </div>

                <div className="settings__panel">
                    <p className="settings__title">Editar direcciones</p>
                    <form className="settings__form_container">
                        {addresses.map((addressObj, index) => (
                            <div key={addressObj.addressId} className="settings__input-container">
                                <label>Dirección {index + 1}</label>
                                <InputText
                                    value={addressObj.address}
                                    onChange={(e) => handleAddressChange(index, e.target.value)}
                                    placeholder="Ingresa la dirección"
                                />
                                <label>Detalles de la dirección {index + 1} (opcional)</label>
                                <InputText
                                    value={addressObj.details}
                                    onChange={(e) => handleAddressChange(index, e.target.value)}
                                    placeholder="Ingresa los detalles de la dirección"
                                />
                            </div>
                        ))}
                        <Button
                            label={'ACTUALIZAR'}
                            severity="secondary"
                            outlined
                            onClick={(event) => {
                                event.preventDefault();
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export { Settings };