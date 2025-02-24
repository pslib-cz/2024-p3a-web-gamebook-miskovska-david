import Item from "./Item";




const InsertItem: React.FC = () => {


    return (
        <div>
            {items.map(item => (
                <Item key={item.itemId} item={item} />
            ))}
        </div>
    );
};

export default InsertItem;
