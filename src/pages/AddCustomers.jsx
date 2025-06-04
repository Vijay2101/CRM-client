// src/pages/AddCustomers.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddCustomers() {
  const [customers, setCustomers] = useState([{ name: '', email: '', phone: '', address: '', spend: '', visits: '', lastActive: '' }]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));

  const handleInputChange = (index, field, value) => {
    const updated = [...customers];
    updated[index][field] = value;
    setCustomers(updated);
  };

  const addCustomerRow = () => {
    setCustomers([...customers, { name: '', email: '', phone: '', address: '', spend: '', visits: '', lastActive: '' }]);
  };

  const submitCustomers = async () => {
    try {
      const payload = customers.map(c => ({ ...c, addedBy: user.email }));
      const res = await axios.post('https://crm-backend-five-beryl.vercel.app/customers', payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Error submitting customers');
      console.error(error);
    }
  };

  const uploadCSV = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('addedBy', user.email);

    try {
      const res = await axios.post('https://crm-backend-five-beryl.vercel.app/api/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(`${res.data.message} | Added: ${res.data.added} | Skipped: ${res.data.skipped}`);
    } catch (error) {
      setMessage('CSV upload failed');
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Add Customers Manually</h2>
      {customers.map((cust, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input className="border rounded px-3 py-2" placeholder="Name" value={cust.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Email" value={cust.email} onChange={(e) => handleInputChange(index, 'email', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Phone" value={cust.phone} onChange={(e) => handleInputChange(index, 'phone', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Address" value={cust.address} onChange={(e) => handleInputChange(index, 'address', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Spend" type="number" value={cust.spend} onChange={(e) => handleInputChange(index, 'spend', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Visits" type="number" value={cust.visits} onChange={(e) => handleInputChange(index, 'visits', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Last Active" type="date" value={cust.lastActive} onChange={(e) => handleInputChange(index, 'lastActive', e.target.value)} />
        </div>
      ))}
      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={addCustomerRow} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Add More</button>
        <button onClick={submitCustomers} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit Customers</button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Or Upload CSV</h2>
      <form onSubmit={uploadCSV} className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input className="file:border file:border-gray-300 file:rounded file:px-3 file:py-1" type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Upload CSV</button>
      </form>

      {message && <p className="text-sm text-center text-gray-700 font-medium">{message}</p>}
    </div>
  );
}

export default AddCustomers;
