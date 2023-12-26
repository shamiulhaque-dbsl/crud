"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCustomer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Use Axios to fetch data from your API
    axios.get('/api/customer') // Replace with your API endpoint
      .then(response => {
        setData(response.data.users);
        //console.log(response.data.users)
      })
     
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  return (
    <div className="card-container">
      {data.map(item => (
        <div key={item.id} className="card">
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Age: {item.age}</p>
          <p>Gender: {item.gender}</p>
          <p>Address: {item.address}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewCustomer;
