import React, { useState, useEffect } from "react";

interface Props {
  item: { title: string; body: string };
  onUpdate: (title: string, body: string) => void;
}

const EditItemForm: React.FC<Props> = ({ item, onUpdate }) => {
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(title, body);
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
        className="bg-green-300 text-white px-4 py-2 rounded"
      >
        Update Item
      </button>
    </form>
  );
};

export default EditItemForm;
