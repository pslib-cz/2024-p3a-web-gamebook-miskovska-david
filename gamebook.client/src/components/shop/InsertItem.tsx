import React, { useEffect, useState } from "react";
import { ItemType } from "../../types/item";
import Item from "./Item";


interface InsertItemProps {
    filterCondition: (item: ItemType) => boolean;
}

const InsertItem: React.FC<InsertItemProps> = ({ filterCondition }) => {
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
                const filteredData = data.filter(filterCondition);
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
    }, [filterCondition]);

    console.log(items);

    if (loading) {
        return <div>Načítání...</div>;
    }

    if (error) {
        return <div>Chyba: {error.message}</div>;
    }

    if (items.length === 0) {
        return <div>Žádná položka nebyla nalezena</div>;
    }

    return (
        <div>
            {items.map(item => (
                <Item key={item.itemId} item={item} />
            ))}
        </div>
    );
};

export default InsertItem;
