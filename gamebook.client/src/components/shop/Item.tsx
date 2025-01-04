import React from "react";
import { ItemType } from "../../types/item";
import style from "./Item.module.css";
import coins from "../../assets/coins/coins.png";
import Buy from "../../components/Button/Buy";

interface ItemProps {
    item: ItemType;
}

const Item: React.FC<ItemProps> = ({ item }) => {

    return (
        <div className={style.item}>
            <img src={`/${item.img}`} alt={item.name} className={style.image} />
            <div className={style.text}>
                <p className={style.name}>{item.name}</p>
                <p className={style.description}>{item.description}</p>
            </div>
            <div>
                <div className={style.price__container}>
                    <p className={style.price}>{item.price} </p>
                    <img src={coins} alt="coins" className={style.coins} />
                </div>
                <Buy btnText="Koupit" />
            </div>
        </div>
    );
};

export default Item;