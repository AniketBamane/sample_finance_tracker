"use client";

import Loading from "@/app/loading";
import { createContext, useContext, useState, useEffect, Suspense } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading,setLoading] = useState(true)

  // Fetch user details from API
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/auth/user-details`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        console.log(data.user, "======= user data =========");
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Load transactions and chart data from localStorage when the app starts
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
   

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      // Default mock data if localStorage is empty
      setTransactions([]);
    }

    fetchUserDetails().then(res=> setLoading(false));
  }, []);

  // Update localStorage whenever transactions or chartData change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    
    <UserContext.Provider value={{ user, setUser, transactions, setTransactions, chartData, setChartData }}>
      {loading ? <Loading/> : children}
    </UserContext.Provider>
  );
};
