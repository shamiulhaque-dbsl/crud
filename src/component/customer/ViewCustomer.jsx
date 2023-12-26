"use client"
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from 'provider/AuthProvider';
import ContentLoader from 'react-content-loader';

const ViewCustomer = () => {
  const { custom,SetCustom} = useContext(AuthContext);
  const [data, setData] = useState([]);

 

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
  
  const handelDelete = (id) => {

    

  } 
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
  onClick={async (e) => {
    e.preventDefault() 
    await fetch(`/api/customer/delete-customer`);
   
  }}
  className="bg-red-400 hover:bg-red-600 px-5 py-2 text-3xl rounded-xl"
/>
        </div>
      ))}
    </div>
  );
};

export default ViewCustomer;
