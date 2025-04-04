import React from "react";
import style from "./Shop.module.css";
import InsertItem from "../../components/shop/InsertItem";
import { Link } from "react-router-dom";

const Room07: React.FC = () => {


    


    return (
        <div className={style.room__screen}>
            <h2>Obchod</h2>
            <div className={style.container}>
                <section> 
                   <p className={style.category}>Zbraně</p>
                   <InsertItem itemType="Weapon" />
                </section>
                <section> 
                    <p className={style.category}>Lektvary</p>
                    <InsertItem itemType="Potions" />
                </section>
                <section> 
                    <p className={style.category}>Speciální předměty</p>
                    <InsertItem itemType="Special" />
                </section>
            </div>
            <Link to="/city-cross" className={style.button}>Odejít</Link>
        </div>
    );
};

export default Room07;
