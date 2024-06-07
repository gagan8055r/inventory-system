import './App.css';
import AddInventoryForm from './components/AddInventoryForm';
import InventoryList from './components/InventoryList';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshInventory = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
           <h1 className="flex items-center justify-center text-2xl font-bold">Inventory Management System</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <AddInventoryForm refreshInventory={refreshInventory} />
        </section>

        <section>
          <InventoryList key={refresh} />
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-lg font">Inventory Management System</h2>
              <p className="mt-2 text-sm text-gray-400">Efficiently manage your products with ease.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-sm text-gray-400">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/" className="hover:text-white">Add Inventory</a></li>
                <li><a href="/" className="hover:text-white">View Inventory</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-gray-400">
                Email: support@inventorysystem.com<br />
                Phone: +91 6579124785
              </p>
            </div> 
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; 2024 Inventory Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;