"use client";
import React, { useState, useMemo } from "react";
import useItems from "./hooks/useItems";
import Modal from "@/components/Modal";
import AddItemForm from "@/components/AddItemForm";
import ItemList from "@/components/ItemList";
import EditItemForm from "@/components/EditItemForm";

interface Item {
  id: string;
  title: string;
  body: string;
}

const Home: React.FC = () => {
  const { items, loading, error, addItem, updateItem, deleteItem } = useItems();
  const [modalState, setModalState] = useState<{
    type: string;
    item: Item | null;
  }>({ type: "", item: null });
  const [filter, setFilter] = useState("");

  const toggleModal = (type = "", item = null) => setModalState({ type, item });

  const handleAddItem = (title: string, body: string) => {
    addItem(title, body);
    toggleModal();
  };

  const confirmDelete = () => {
    if (modalState?.item) deleteItem(Number(modalState.item.id));
    toggleModal();
  };

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
      ),
    [items, filter]
  );

  return (
    <div className="p-4 bg-yellow-50">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => toggleModal("add")}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
        <div>
          <input
            type="text"
            className="border p-2 mr-2"
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <Modal isOpen={modalState.type === "add"} onClose={() => toggleModal()}>
        <AddItemForm onAdd={handleAddItem} />
      </Modal>

      <Modal isOpen={modalState.type === "edit"} onClose={() => toggleModal()}>
        {modalState.item && (
          <EditItemForm
            item={modalState.item}
            onUpdate={(title, body) => {
              if (modalState) {
                updateItem(modalState.item.id, { title, body });
                toggleModal();
              }
            }}
          />
        )}
      </Modal>

      <Modal
        isOpen={modalState.type === "delete"}
        onClose={() => toggleModal()}
      >
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold">
            Are you sure you want to delete this item?
          </h3>
          <div className="flex justify-between mt-4">
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toggleModal()}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <ItemList
        items={filteredItems}
        onDelete={(id) => toggleModal("delete", { id })}
        onEdit={(item) => toggleModal("edit", item)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Home;
