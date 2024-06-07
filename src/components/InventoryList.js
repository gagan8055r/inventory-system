import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditInventoryForm from './EditInventoryForm';

function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchInventory = async () => {
    const response = await axios.get('http://localhost:4000/products');
    setInventory(response.data);
  };

  const deleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await axios.delete(`http://localhost:4000/products/${id}`);
      fetchInventory();
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {editingItem ? (
        <EditInventoryForm item={editingItem} refreshInventory={fetchInventory} setEditingItem={setEditingItem} />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4 px-20">Inventory List</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Item ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Created_Time</th>
                <th className="py-2 px-4 border-b">Updated_Time</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.item_id}</td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.category}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">{item.price}</td>
                  <td className="py-2 px-4 border-b">{item.created_at}</td>
                  <td className="py-2 px-4 border-b">{item.updated_at}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => setEditingItem(item)} className="text-blue-500 mr-2">Edit</button>
                    <button onClick={() => deleteItem(item.id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default InventoryList;
