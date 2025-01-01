export type RoomType = {
    id: number;
    background: string;
    specialItem: string;
    dialogs: Array<string>;
}

export type ItemType = {
    itemId: number;
    name: string;
    description: string;
    background: string;
    price: number;
    demage: number;
    defense: number;
}