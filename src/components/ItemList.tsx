import React from "react";
import { Item } from "@/app/hooks/useItems";
import ItemCard from "./ItemCard";

interface Props {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

const ItemList: React.FC<Props> = ({ items, onDelete, onEdit }) => {
  if (!!!items?.length) return <h1>No Items Found</h1>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ItemList;
