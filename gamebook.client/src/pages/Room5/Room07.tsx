import React, { useEffect, useState } from "react";
import { ItemType } from "../../types/item";
import style from "./Room07.module.css";
import coins from "../../assets/coins/coins.png";
import Buy from "../../components/Button/Buy";

const Room07: React.FC = () => {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [items, setItems] = useState<ItemType[]>([]); 

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/Item/items'); 
                if (!response.ok) {
                    throw new Error("Nepodařilo se načíst položky");
                }
                const data: ItemType[] = await response.json();
                const filteredData = data.filter(item => item.itemId <= 7 && item.itemId >= 1); // Filtrovat položky ID 1-7
                setItems(filteredData); 
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error("Něco se pokazilo"));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    if (loading) {
        return <div>Načítání...</div>;
    }

    if (error) {
        return <div>Chyba: {error.message}</div>;
    }

    if (items.length === 0) {
        return <div>Žádná položka nebyla nalezena</div>;
    }

    console.log("Item data:", items);

    const weaponItems = items.filter(item => item.itemId === 1 || item.itemId === 2);
    const potionItems = items.filter(item => item.itemId >= 3 && item.itemId <= 5); 
    const specialItems = items.filter(item => item.itemId === 6 || item.itemId === 7);

    return (
        <div className={style.room__screen}>
            <h2>Obchod</h2>
            <div className={style.container}>
              <p className={style.category}>Zbraně</p>
            {weaponItems.map((item) => (
                <div key={item.itemId} className={style.item}>
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
            ))}

            <p className={style.category}>Lektvary</p>
            {potionItems.map((item) => (
                <div key={item.itemId} className={style.item}>
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
            ))}

            <p className={style.category}>Speciální předměty</p>
            {specialItems.map((item) => (
                <div key={item.itemId} className={style.item}>
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
            ))}  
            </div>
        </div>
    );
};

export default Room07;
