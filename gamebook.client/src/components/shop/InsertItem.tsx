import useFetch from "../../hooks/useFetch";
import { ItemType } from "../../types";
import Item from "./Item";

type InsertItemProps = {
    itemType: "Weapon" | "Potions" | "Special";
}

const InsertItem: React.FC<InsertItemProps> = ({itemType}) => {

    const {data} = useFetch<ItemType[]>("/api/Item/items");

    const items = data?.filter(item => item.type === itemType);
    return (
        <div>
            {items?.map(item => (
                <Item key={item.itemId} item={item} />
            ))}
        </div>
    );
};

export default InsertItem;
