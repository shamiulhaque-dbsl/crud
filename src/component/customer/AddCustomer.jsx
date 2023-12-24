"use client"
import { useState } from 'react';
import axios from 'axios';
const AddCustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'male',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/customer/add-customer', formData);
            console.log('Customer created:', response.data);
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };


    return (
        <div>
            <h1>Create Customer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />

                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required /><br />

                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br />

                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" value={formData.address} onChange={handleChange} required></textarea><br />

                <button type="submit">Create Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;