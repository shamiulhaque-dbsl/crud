"use client"
import { useContext, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { AuthContext } from 'provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {
    const [formData, setFormData] = useState({});
    const { custom,SetCustom} = useContext(AuthContext);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/customer/add-customer', formData);
            console.log('Customer created:', response);
            if (response) {
                //toast
                toast("Contact deleted successfully");
              }
            
        }
        
         catch (error) {
            console.error('Error creating customer:', error);
        }
    };
   
    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Create Customer</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />

                <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age:</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />

                <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender:</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required>
                    <option value="option">option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address:</label>
                <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-3 border rounded-md" required></textarea>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Customer</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddCustomer;
