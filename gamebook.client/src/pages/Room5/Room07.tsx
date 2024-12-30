import React, { useEffect, useState } from "react";
import { ItemType } from "../../types/item";
import style from "./Room07.module.css";

const Room07: React.FC = () => {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [item, setItem] = useState<ItemType | null>(null); 

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/Item/items/1'); 
                if (!response.ok) {
                    throw new Error("Nepodařilo se načíst položku");
                }
                const data = await response.json();
                setItem(data); 
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
        fetchItem();
    }, []);

    if (loading) {
        return <div>Načítání...</div>;
    }

    if (error) {
        return <div>Chyba: {error.message}</div>;
    }

    if (!item) {
        return <div>Žádná položka nebyla nalezena</div>;
    }

    console.log("Item data:", item);

    return (
        <div className={style.room__screen}>
            <h1>Obchod</h1>
            <img src={`/${item.img}`} alt={item.name} className={style.image} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Cena: {item.price} </p>
        </div>
    );
};

export default Room07;
