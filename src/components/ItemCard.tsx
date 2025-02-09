import { Item } from "@/app/hooks/useItems";

interface Props {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

const ItemCard: React.FC<Props> = ({ item, onDelete, onEdit }) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
      <p className="text-gray-900">{item.body}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(item)}
          className="bg-blue-900 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
