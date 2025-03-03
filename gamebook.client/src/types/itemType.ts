export type ItemType = {
    itemId: number;
    name: string;
    description: string;
    background: string;
    price: number;
    demage: number;
    defense: number;
    type: "Weapon" | "Potions" | "Special";
}