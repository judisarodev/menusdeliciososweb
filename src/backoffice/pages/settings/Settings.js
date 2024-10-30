import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useContext, useEffect, useRef, useState } from "react";
import './settings.scss';
import { Image } from "primereact/image";
import { MenuContext } from "../../context/restaurant/MenuContext";
import { TokenContext } from "../../context/token/TokenContextProvider";
import { MdDelete } from "react-icons/md";
import { Toast } from 'primereact/toast';

const useAddresses = () => {
    const [addresses, setAddresses] = useState([]);

    const updateAddressField = (index, field, newValue) => {
        setAddresses(addresses.map((address, i) => {
            if (index === i) {
                return {
                    ...address,
                    [field]: newValue
                }
            }
            return address;
        }));
    };

    const addAddress = () => {
        setAddresses([...addresses, {
            addressId: null,
            address: '',
            details: ''
        }]);
    }

    const deleteAddress = (toast, BASE_URL, token, addressId) => {
        fetch(BASE_URL + '/address/delete/' + addressId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        }).then((data) => {
            setAddresses(addresses.filter((address, i) => {
                if (address.addressId !== addressId) {
                    return address;
                }
            }));
            toast.current.show({ severity: 'info', summary: 'Dirección eliminada con éxito' });
        }).catch((error) => {
            console.log(error);
        });
    }

    return {
        addresses,
        setAddresses,
        updateAddressField,
        addAddress,
        deleteAddress
    };
}

const Settings = () => {
    const BASE_URL = process.env.REACT_APP_URL;

    const menuContext = useContext(MenuContext);
    const { restaurant, countries, restaurantTypes } = menuContext;

    const tokenContext = useContext(TokenContext);
    const { token } = tokenContext;

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [restaurantType, setRestaurantType] = useState('');
    const { addresses, setAddresses, updateAddressField, addAddress, deleteAddress } = useAddresses();
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState(null);

    const toast = useRef(null);

    useEffect(() => {
        if (restaurant) {
            setName(restaurant.name);
            setPhoneNumber(restaurant.phoneNumber);
            setCountry(restaurant.country);
            setRestaurantType(restaurant.restaurantType);
            setAddresses(restaurant.addresses);
            setEmail(restaurant.email);
            setLogo(restaurant.logo);
        }
    }, [restaurant]);


    const updateAddresses = () => {
        fetch(BASE_URL + '/address/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(addresses),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        }).then((data) => {
            toast.current.show({ severity: 'info', summary: 'Direcciones actualizadas con éxito' });
        }).catch((error) => {
            console.log(error);
        });
    }

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
                restaurantTypeId: restaurantType.restaurantTypeId,
                email
            }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.status);
        }).then((data) => {
            toast.current.show({ severity: 'info', summary: 'Información actualizada con éxito' });
        }).catch((error) => {
            console.log(error);
        });
    }

    return (<>
        <Toast ref={toast} />
        <div className="settings__container">
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
                        <label>Correo electrónico *</label>
                        <InputText
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa el correo electónico" />
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

                    <Button
                        label={'ACTUALIZAR'}
                        onClick={(event) => {
                            event.preventDefault();
                            updateRestaurant();
                        }}
                    />
                </form>
            </div>

            <div className="settings__panel">
                <p className="settings__title">Editar direcciones</p>
                <form className="settings__form_container">
                    {addresses.map((addressObj, index) => (
                        <div className="settings__address-container">
                            <div className="settings__address-container-form">
                                <div key={addressObj.addressId} className="settings__input-container">
                                    <label>Dirección {index + 1}</label>
                                    <InputText
                                        value={addressObj.address}
                                        onChange={(e) => updateAddressField(index, 'address', e.target.value)}
                                        placeholder="Ingresa la dirección"
                                    />
                                    <label>Detalles de la dirección {index + 1} (opcional)</label>
                                    <InputText
                                        value={addressObj.details}
                                        onChange={(e) => updateAddressField(index, 'details', e.target.value)}
                                        placeholder="Ingresa los detalles de la dirección"
                                    />
                                </div>
                            </div>
                            <div className="settings__address-container-delete-button">
                                <Button
                                    outlined
                                    disabled={addresses.length > 1 ? false : true}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        deleteAddress(toast, BASE_URL, token, addressObj.addressId);
                                    }} label={<MdDelete size={20} />} severity="danger" tooltip="Eliminar" tooltipOptions={{ position: 'top' }} />
                            </div>
                        </div>
                    ))}
                    <Button
                        label="AGREGAR NUEVA DIRECCIÓN"
                        severity="secondary"
                        outlined
                        onClick={(e) => {
                            e.preventDefault();
                            addAddress();
                        }}
                    />
                    <Button
                        label={'ACTUALIZAR'}
                        onClick={(event) => {
                            updateAddresses();
                            event.preventDefault();
                        }}
                    />

                </form>
            </div>

            <div className="settings__panel">
                <p className="settings__title">Logo del restaurante</p>
                {logo && <Image width="200" src={logo} />}
                <Button
                    label={!logo ? 'SUBIR LOGO' : 'CAMBIAR LOGO'}
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                />
            </div>

            <div className="settings__panel">
                <p className="settings__title">Actualizar contraseña</p>
                <Button
                    label={'ENVIAR CORREO *'}
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                />
                <small>(*) Recibirás un email con un link que te permitirá cambiar tu contraseña. </small>
            </div>
        </div>
    </>);
}

export { Settings };