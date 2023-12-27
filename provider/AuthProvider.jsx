"use client"
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [custom,SetCustom] = useState([]);
  const [myid,setMyid] = useState(1032);

 
  const AllInfo = {
    loader,
    setLoader,
    user, 
    setUser,
    custom,
    SetCustom,
    myid,
    setMyid
    
  };

  return (
    <AuthContext.Provider value={AllInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;