import React from "react";
import style from "./Shop.module.css";
import InsertItem from "../../components/shop/InsertItem";

const Room07: React.FC = () => {
    return (
        <div className={style.room__screen}>
            <h2>Obchod</h2>
            <div className={style.container}>
                <section> 
                   <p className={style.category}>Zbraně</p>
                   <InsertItem filterCondition={(item) => item.itemId === 1 || item.itemId === 2} />
                </section>
                <section> 
                    <p className={style.category}>Lektvary</p>
                    <InsertItem filterCondition={(item) => item.itemId >= 3 && item.itemId <= 5} />
                </section>
                <section> 
                    <p className={style.category}>Speciální předměty</p>
                    <InsertItem filterCondition={(item) => item.itemId === 6 || item.itemId === 7} />
                </section>
            </div>
        </div>
    );
};

export default Room07;
