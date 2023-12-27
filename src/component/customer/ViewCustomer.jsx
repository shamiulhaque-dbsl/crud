"use client"
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from 'provider/AuthProvider';
import ContentLoader from 'react-content-loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ViewCustomer = () => {
  const { custom,SetCustom,myid,setMyid} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [Id, setId] = useState(1000);
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Address, setAddress] = useState("");


      const handeledit = (item) => {
      
      setOpen(!open)
      setId(item.id)
      setName(item.name)
      setAge(item.age)
      setGender(item.gender)
     setAddress(item.address) 
     }
  

  
  const handleChanges = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value, id: Id
    });
};

const handleSubmits = async (e) => {
  console.log(formData,"my name")
    e.preventDefault();

    try {
        const response = await axios.put('/api/customer/edit-customer', formData);
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
  
  async function handleDelete(id) {
  
    const confirmed = confirm(
      "Are you sure, your want to delete this contact"
    );
    if (confirmed) {
      const res = await fetch(`/api/customer/delete-customer`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id })
      });

      
      if (res.ok) {
        //toast
        toast("Contact deleted successfully");
      }
    }
  }


  useEffect(() => {
    // Use Axios to fetch data from your API
    axios.get('/api/customer') // Replace with your API endpoint
      .then(response => {
        SetCustom(response.data.users);
        console.log(response.data.users)
       
      })
     
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

   if (!custom) {
    return <ContentLoader viewBox="0 0 380 70">
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>;
  }
  

  return (
    <div className="card-container">
      {custom.map(item => (
        <div key={item.id} className="card">
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <p>Gender: {item.gender}</p>
          <p>Address: {item.address}</p>
          <button
  onClick={() => handleDelete (item.id)}
  className="bg-red-400 hover:bg-red-600 px-5 py-2 text-3xl rounded-xl"/>
  <button onClick={()=> handeledit (item)}> Edit </button>
 
        </div>
      ))}     <ToastContainer />
       {
                open && 
                <ul >
                <div className="ml-80 mt-8 mb-20">
            <h1 className="text-3xl font-bold mb-4">Edit Customer</h1>
            <form onSubmit={handleSubmits} className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name:</label>
                <input type="text" id="name" name="name" defaultValue={Name} value={formData.name} onChange={handleChanges} className="w-full px-3 py-2 border rounded-md" required />

                <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age:</label>
                <input type="number" id="age" name="age" defaultValue={Age} value={formData.age} onChange={handleChanges} className="w-full px-3 py-2 border rounded-md" required />

                <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender:</label>
                <select id="gender" name="gender" defaultValue={Gender} value={formData.gender} onChange={handleChanges} className="w-full px-3 py-2 border rounded-md" required>
                    <option value="option">option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address:</label>
                <textarea id="address" name="address" defaultValue={Address} value={formData.address} onChange={handleChanges} className="w-full px-3 py-3 border rounded-md" required></textarea>

                <button type="submit"  className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
            </form>
            
        </div>
            </ul>
   }
    </div>
  );
};

export default ViewCustomer;
