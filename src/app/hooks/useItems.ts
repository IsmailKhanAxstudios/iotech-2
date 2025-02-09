import { useState, useEffect } from "react";

export interface Item {
  id: number;
  title: string;
  body: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data.slice(0, 10));
    } catch (err) {
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (title: string, body: string) => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const newItem = { userId: 1, id: newId, title, body };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const addedItem = await response.json();
      setItems([...items, addedItem]);
    } catch (err) {
      setError("Failed to add item");
    }
  };

  const updateItem = async (
    id: number,
    updatedData: { title: string; body: string }
  ) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );
    } catch (err) {
      setError("Failed to update item");
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
      }

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, addItem, updateItem, deleteItem };
};

export default useItems;
