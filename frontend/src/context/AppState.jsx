import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// https://chatgpt.com/c/67d1c2e9-6870-8002-a588-d9734d14b480
const AppContext = createContext(null);

const AppState = ({ children }) => {
  const url = "http://localhost:3000/api";
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  });

  const register = async (name, email, password) => {
    const response = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  };

  const userProfile = async () => {
    try {
      const response = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data);
    }
  };

  const logout = async () => {
    const response = await axios.get(`${url}/user/logout`, {
      withCredentials: true,
    });
    if(response.data.success){
      alert(response.data.message)
      setLoggedIn(false);
      setUser("");
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    userProfile();
    setLoggedIn(true);
    return response.data;
  };

  const createQueston = async (question) => {
    const response = await axios.post(
      `${url}/script/create`,
      { question },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);
  };

  return (
    <AppContext.Provider
      value={{ url, register, login, user, loggedIn, createQueston, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppState;
