import React from "react";
import { ItemType, PlayerType } from "../../types/";
import style from "./Item.module.css";
import coins from "../../assets/coins/coins.png";
import Buy from "../../components/button/Buy";
import useFetch from "../../hooks/useFetch";

type ItemProps = {
    item: ItemType;
}

const Item: React.FC<ItemProps> = ({ item }) => {

    const {data} = useFetch<PlayerType>(`/api/Player/players/${localStorage.getItem("UserId")}`);

    console.log(data);
    const buyHandler = () => {
        if(parseInt(localStorage.getItem("gold")) >= item.price){
        const newGold = data!.coin - item.price;
        localStorage.setItem("gold", JSON.stringify(newGold));
        localStorage.setItem("item", JSON.stringify(item));        
    }
    }


    return (
        <div className={style.item}>
            <img src={`/${item.background}`} alt={item.name} className={style.image} />
            <div className={style.text}>
                <p className={style.name}>{item.name}</p>
                <p className={style.description}>{item.description}</p>
            </div>
            <div>
                <div className={style.price__container}>
                    <p className={style.price}>{item.price} </p>
                    <img src={coins} alt="coins" className={style.coins} />
                </div>
                <Buy btnText="Koupit" onClick={buyHandler} />
            </div>
        </div>
    );
    
};

export default Item;