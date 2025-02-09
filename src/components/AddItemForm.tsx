import React, { useState } from "react";

interface Props {
  onAdd: (title: string, body: string) => void;
}

const AddItemForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded mb-4">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2 text-gray-900"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2 text-gray-900"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-900 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
