import React from "react";
import './home.scss';
import { DishForm } from "../../dish/dish-form/DishForm";
import { Table } from "../../dish/dishes-table/Table";
import { Emulator } from "./../../components/emulator/Emulator";
import { CategoriesContextProvider } from "../../context/restaurant/CategoriesContext";
import { ProductsContextProvider } from "../../context/restaurant/ProductsContext";

const Home = () => {    
    return(<>
    <CategoriesContextProvider>
        <ProductsContextProvider>
            <div className="bhome__container">
                <div className="bhome__manager-container">
                    <DishForm />
                </div>
                <div className="bhome__menu-sample">
                    <Emulator />
                </div>
                <div className="bhome__table">
                    <Table />
                </div>
            </div>
        </ProductsContextProvider>
    </CategoriesContextProvider>
    </>);
}

export { Home }; 