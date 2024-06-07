import React, { useState } from 'react';
import axios from 'axios';

function EditInventoryForm({ item, refreshInventory, setEditingItem }) {
  const [item_id, setItemId] = useState(item.item_id);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!item_id) errors.item_id = "Item ID is required";
    if (!name) errors.name = "Name is required";
    if (!category) errors.category = "Category is required";
    if (!quantity || quantity <= 0) errors.quantity = "Quantity should be a positive number";
    if (!price || price <= 0) errors.price = "Price should be a positive number";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await axios.put(`http://localhost:4000/products/${item.id}`, {
      item_id,
      name,
      category,
      quantity: Number(quantity),
      price: Number(price),
    });
    refreshInventory();
    setEditingItem(null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl mb-4">Edit Item</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Item ID</label>
        <input
          type="text"
          value={item_id}
          onChange={(e) => setItemId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.item_id && <p className="text-red-500 text-xs mt-1">{errors.item_id}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white"
        >
          <option value="" disabled>Select a category</option>
          {['Electronics', 'Groceries', 'Books', 'Furniture', 'Sports'].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
      <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
    </form>
  );
}

export default EditInventoryForm;
