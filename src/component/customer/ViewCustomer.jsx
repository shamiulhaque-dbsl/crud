"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useAppContext } from 'provider/AppContext';


const ViewCustomer = () => {
  const router = useRouter();
  const { user,setUser } = useAppContext()
  const [form, setForm] = useState([]);
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
  //console.log(formData,"my name")
    e.preventDefault();

    try {
        const response = await axios.put('/api/customer/edit-customer', formData);
        console.log('Edited created:', response);
        if (response) {
          setOpen(false)
         // update the data without refrash 
          const updatedUser = user.map((item) =>
          item.id === Id ? { ...item, ...formData } : item
        );
        setUser(updatedUser);



            //toast
            toast("Contact deleted successfully");
            router.push('/')
            
           
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
  
        // Remove the deleted user from the user state
        const updatedUser = user.filter((item) => item.id !== id);
        setUser(updatedUser);

        //toast
        toast("Contact deleted successfully");
        router.push('/')
        
       
      }
    }
  }


  useEffect(() => {
    const fetchData = async () =>
     {
      try {
        const response = await axios.get('/api/customer');
        console.log(response.data.users);
        setUser(response.data.users);
          }
       catch (error)
        {
        console.error('Error fetching data:', error);
        }
      };
  
    fetchData(); // Initial fetch
  
    // If there's a successful create or delete operation, trigger a re-fetch
    const shouldRefetch = localStorage.getItem('shouldRefetch');
    if (shouldRefetch) {
      localStorage.removeItem('shouldRefetch'); // Remove the flag
      fetchData();
    }
  }, [user]); // Trigger re-fetch when user state changes
  

  

  return (
    <div>
    <div className="card-container">
      {user.map(item => (
        <div key={item.id} className="card">
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <p>Gender: {item.gender}</p>
          <p>Address: {item.address}</p>
          <button
  onClick={() => handleDelete (item.id)}
  className="bg-red-500 hover:bg-red-700 text-white px-1 py-1 text-sm rounded-md"> Delete </button>
  <button className="ml-2 mt-5 bg-sky-500 hover:bg-sky-700 text-white px-4 py-1 text-sm rounded-md"
   onClick={()=> handeledit (item)}> Edit </button>
 
        </div>
      ))}     <ToastContainer />
       
    </div>
    {
                open && 
                <ul >
                <div className=" mt-8 mb-20 ml-8 mr-40 absolute top-0 left-0 bg-gray-300 rounded-xl px-5 pt-5 pb-16">
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
