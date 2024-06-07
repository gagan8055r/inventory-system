import React, { useState } from 'react';
import axios from 'axios';

function AddInventoryForm({ refreshInventory }) {
  const [item_id, setItemId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [touched, setTouched] = useState({});

  const validate = () => {
    let errors = {};
    if (!item_id) errors.item_id = "Item ID is required";
    if (!name) errors.name = "Name is required";
    if (!category) errors.category = "Category is required";
    if (!quantity || quantity <= 0) errors.quantity = "Quantity should not be empty";
    if (!price || price <= 0) errors.price = "Price should not be empty";
    return errors;
  };

  const handleBlur = (field) => {
    const value = { item_id, name, category, quantity, price }[field];
    setTouched(prev => ({ ...prev, [field]: value ? false : true }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setTouched(Object.keys(validationErrors).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {}));
      return;
    }

    await axios.post('http://localhost:4000/products', {
      item_id,
      name,
      category,
      quantity: Number(quantity),
      price: Number(price),
    });
    refreshInventory();
    setItemId('');
    setName('');
    setCategory('');
    setQuantity('');
    setPrice('');
    setTouched({});
  }; 

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 h-25">
      <div className="mb-1">
      <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
        <label className="block text-gray-700">Item ID</label>
        <input
          type="text"
          value={item_id}
          onChange={(e) => {
            setItemId(e.target.value);
            if (e.target.value) setTouched(prev => ({ ...prev, item_id: false }));
          }}
          onBlur={() => handleBlur('item_id')}
          className={`w-full p-2 border border-gray-300 rounded ${touched.item_id && !item_id ? 'border-red-500' : ''}`}
        />
        {touched.item_id && !item_id && <p className="text-red-500 text-xs mt-1">Item ID is required</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value) setTouched(prev => ({ ...prev, name: false }));
          }}
          onBlur={() => handleBlur('name')}
          className={`w-full p-2 border border-gray-300 rounded ${touched.name && !name ? 'border-red-500' : ''}`}
        />
        {touched.name && !name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            if (e.target.value) setTouched(prev => ({ ...prev, category: false }));
          }}
          onBlur={() => handleBlur('category')}
          className={`w-full p-2 border border-gray-300 rounded bg-white ${touched.category && !category ? 'border-red-500' : ''}`}
        >
          <option value="" disabled>Select a category</option>
          {['Electronics', 'Groceries', 'Books', 'Furniture', 'Sports'].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {touched.category && !category && <p className="text-red-500 text-xs mt-1">Category is required</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            if (e.target.value && Number(e.target.value) > 0) setTouched(prev => ({ ...prev, quantity: false }));
          }}
          onBlur={() => handleBlur('quantity')}
          className={`w-full p-2 border border-gray-300 rounded ${touched.quantity && (!quantity || quantity <= 0) ? 'border-red-500' : ''}`}
        />
        {touched.quantity && (!quantity || quantity <= 0) && <p className="text-red-500 text-xs mt-1">Quantity should not be empty</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            if (e.target.value && Number(e.target.value) > 0) setTouched(prev => ({ ...prev, price: false }));
          }}
          onBlur={() => handleBlur('price')}
          className={`w-full p-2 border border-gray-300 rounded ${touched.price && (!price || price <= 0) ? 'border-red-500' : ''}`}
        />
        {touched.price && (!price || price <= 0) && <p className="text-red-500 text-xs mt-1">Price should not be empty</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Item</button>
    </form>
  );
}

export default AddInventoryForm;