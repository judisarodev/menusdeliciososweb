import React, { useEffect, useRef, useState } from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoMdRestaurant } from 'react-icons/io';
import { Button } from 'primereact/button';
import { InfoCard } from '../../components/info-card/InfoCard';
import { Card } from '../../components/card/Card';
import { Block } from '../../components/block/Block';
import { Gallery } from '../../components/gallery/Gallery';
import { Review } from '../../components/review/Review';
import { FakView } from '../../components/fak/Fak';
import { Menu } from './../../components/menu/Menu';
import './home.scss'; 
import blockImage1 from './../../../assets/home/cooking.jpg';
import blockImage2 from './../../../assets/home/usage.jpg';
import menu1 from './../../../assets/home/menu1.jpg';
import menu2 from './../../../assets/home/menu2.jpg';
import menu3 from './../../../assets/home/menu3.jpg';
import menu4 from './../../../assets/home/menu4.jpg';
import menu5 from './../../../assets/home/menu5.jpg';
import menu6 from './../../../assets/home/menu6.jpg';
import menu7 from './../../../assets/home/menu7.jpg';
import menu8 from './../../../assets/home/menu8.jpg';
import review1 from './../../../assets/home/review1.png';
import review2 from './../../../assets/home/review2.png';
import { Prices } from '../../components/prices/Prices';

const Home = () => {

    const homeRef = useRef();
    const patternsRef = useRef();
    const pricesRef = useRef(); 

    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    useEffect(() => {
        const refs = [homeRef, patternsRef, pricesRef];
        setTimeout(() => {
            
            if (selectedMenuItem >= 0 && selectedMenuItem < refs.length && refs[selectedMenuItem].current) {
                refs[selectedMenuItem].current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    }, [selectedMenuItem]);

    const cardsInfo = [{
        id: 1,
        icon: <IoMdRestaurant className="home__card-icon" size={40} />, 
        title: 'Diseños', 
        text: 'Crea menús digitales atractivos para tu restaurante. Actualiza platos y precios en tiempo real.', 
        action: 'Descubre Más',
    }, {
        id: 2,
        icon: <IoPhonePortraitOutline className="home__card-icon" size={40} />, 
        title: 'Acceso', 
        text: 'Tus menús digitales estarán disponibles desde cualquier dispositivo móvil, tablet o computadora.', 
        action: 'Aprende Cómo',
    }, {
        id: 3,
        icon: <IoStatsChart className="home__card-icon" size={40} />, 
        title: 'Visibilidad', 
        text: 'Aumenta la visibilidad de tu restaurante y atrae más clientes con menús interactivos y agradables.', 
        action: 'Empieza Ahora',
    }];

    const infoCard = {
        title: '¡Mes Gratis para Probar Todas las Funciones!',
        description: 'Prueba nuestro servicio gratis por un mes. Disfruta de todas las funciones premium sin compromiso. Aprovecha esta oferta exclusiva y mejora tu experiencia. ¡Inscríbete ahora y comienza hoy mismo',
        smallText: 'Oferta por tiempo limitado'
    };

    const blocks = [{
        id: 1,
        image: blockImage1,
        title: 'Personaliza Tu Menú',
        subtitle: 'Ajusta Cada Detalle',
        description: 'Con nuestra plataforma, puedes crear y personalizar menús digitales de forma sencilla. Añade y edita platos, cambia precios en tiempo real y elige entre múltiples plantillas para reflejar el estilo único de tu restaurante. Ofrece a tus clientes una experiencia visual atractiva y moderna que los invite a volver.',
        imageLeftSide: true
    }, {
        id: 2,
        image: blockImage2,
        title: 'Accesibilidad y Comodidad',
        subtitle: 'Disponible en Todos los Dispositivos',
        description: 'Tus menús digitales estarán accesibles desde cualquier dispositivo móvil, tablet o computadora. Esto permite a tus clientes explorar y elegir sus platos favoritos desde la comodidad de su hogar o en tu restaurante. Mejora la experiencia del cliente y facilita la gestión del menú con nuestra tecnología intuitiva y fácil de usar.',
        imageLeftSide: false
    }];

    const gallery = {
        title: 'Galería de Diseños',
        subtitle: 'Explora Nuestras Plantillas',
        description: 'Descubre una variedad de diseños y estilos para tus menús digitales. Cada uno está diseñado para resaltar la personalidad y el estilo único de tu restaurante, brindando a tus clientes una experiencia visual atractiva.',
        images: [{
            id: 1,
            name: 'Menú Clásico',
            image: menu1,
        },{
            id: 2,
            name: 'Menú Moderno',
            image: menu2,
        },{
            id: 3,
            name: 'Menú Rústico',
            image: menu3,
        },{
            id: 4,
            name: 'Menú Elegante',
            image: menu4,
        },{
            id: 5,
            name: 'Menú Minimalista',
            image: menu5,
        },{
            id: 6,
            name: 'Menú Temático',
            image: menu6,
        },
        {
            id: 7,
            name: 'Menú Panadería',
            image: menu7,
        },{
            id: 8,
            name: 'Menú Comida Rápida',
            image: menu8,
        },],
    };

    const reviews = [{
        image: review1,
        title: 'Excelente Herramienta para Restaurantes Modernos',
        description: 'He estado usando esta plataforma para crear menús digitales para mi restaurante y la experiencia ha sido increíble',
        author: 'Esperanza Rodríguez de Moka Tortas'
    },{
        image: review2,
        title: 'Transformación Digital Impresionante',
        description: 'Desde que implementamos los menús digitales con esta plataforma, hemos visto un aumento notable en la interacción con nuestros clientes.',
        author: 'Francisco Suarez de Pizza Now'
    }];

    const faks = [{
        question: '¿Cómo puedo crear y personalizar un menú digital?',
        answer: 'Crear y personalizar un menú digital es muy sencillo. Solo necesitas acceder a nuestra plataforma, seleccionar una plantilla que se ajuste a tu estilo y empezar a agregar tus platos y precios. Puedes personalizar los colores, las fuentes y las imágenes para que coincidan con la identidad de tu restaurante.'
    },{
        question: '¿Es posible actualizar los menús en tiempo real?',
        answer: 'Sí, puedes actualizar tus menús en tiempo real. Esto significa que cualquier cambio en los platos o precios se reflejará instantáneamente en el menú digital, asegurando que tus clientes siempre tengan la información más actualizada.'
    },{
        question: '¿Puedo acceder a los menús digitales desde cualquier dispositivo?',
        answer: 'Absolutamente. Nuestros menús digitales están diseñados para ser accesibles desde cualquier dispositivo, ya sea un móvil, una tablet o una computadora. Esto brinda a tus clientes una experiencia cómoda y accesible sin importar cómo accedan a tu menú.'
    },{
        question: '¿Cómo puede mi restaurante beneficiarse de los menús digitales?',
        answer: 'Los menús digitales pueden aumentar la visibilidad de tu restaurante y atraer más clientes. Ofrecen una experiencia interactiva y moderna que puede compartirse fácilmente en redes sociales y plataformas de reseñas. Además, facilitan la actualización y gestión de tu menú, mejorando la eficiencia operativa y la satisfacción del cliente.'
    },];

    return(<div>
        <Menu setSelectedMenuItem={setSelectedMenuItem}/>
        <section className="home__banner" ref={homeRef}>
            <h1 className="poppins-bold">Crea <span>Menús</span> Digitales Para <span>Restaurantes</span></h1>
            <Button label="Empezar ahora" severity="warning" />
        </section>
        <section className="home__floating-cards-container">
            <div className="home__cards-container">
                {cardsInfo.map((card) => {
                    return <Card key={card.id} icon={card.icon} title={card.title} text={card.text} action={card.action} />
                })}
            </div>
        </section>
        <section>
            <InfoCard title={infoCard.title} description={infoCard.description} />
        </section>
        <section>
            {blocks.map((block) => (
                <Block key={block.id} image={block.image} title={block.title} subtitle={block.subtitle} description={block.description} imageLeftSide={block.imageLeftSide}/>
            ))}
        </section>
        <section ref={patternsRef}>
            <Gallery title={gallery.title} subtitle={gallery.subtitle} description={gallery.description} images={gallery.images}/>
        </section>
        <section>
            <Review reviews={reviews}/>
        </section>
        <section>
            <FakView faks={faks}/>
        </section>
        <section ref={pricesRef}>
            <Prices/>
        </section>
    </div>);
}

export { Home }; 