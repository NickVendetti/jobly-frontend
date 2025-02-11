import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./Routes";
import JoblyApi from "./api/api";
import { jwtDecode } from "jwt-decode";
import UserContext from "./contexts/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);

  // Fetch user details when token exists
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
  
    if (savedToken) {
      JoblyApi.token = savedToken;
      setToken(savedToken); // This updates token state
    }
  }, []);
  
  // Fetch user AFTER token is set
  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          let userRes = await JoblyApi.request(`users/${username}`);
          setCurrentUser(userRes.user);
        } catch (err) {
          console.error("Error fetching user:", err);
          setCurrentUser(null);
        }
      }
    }
    fetchUser();
  }, [token]);

  // Define login function
  async function login(username, password) {
    try {
      let res = await JoblyApi.request("auth/token", { username, password }, "post");
      let token = res.token;
  
      console.debug("✅ Storing token in localStorage & state:", token); // Debugging
  
      localStorage.setItem("token", token);
      JoblyApi.token = token;  // Store in API class
      setToken(token);  // Update state
  
      let { username: decodedUsername } = jwtDecode(token);
      console.debug("🔍 Decoded username:", decodedUsername); // Debugging
  
      let userRes = await JoblyApi.request(`users/${decodedUsername}`);
      console.debug("✅ Fetched user data:", userRes.user); // Debugging
  
      setCurrentUser(userRes.user);
    } catch (err) {
      console.error("❌ Login failed:", err);
      throw new Error("Invalid username/password");
    }
  }

  // Define logout function
  function logout() {
    setToken(null);  // ✅ Clears from localStorage too
    setCurrentUser(null);

  }
  async function signup(userData) {
    try {
      let res = await JoblyApi.request("auth/register", userData, "post"); //  Fix API endpoint
      let token = res.token;
  
      // Store token
      localStorage.setItem("token", token);
      JoblyApi.token = token;
      setToken(token);
  
      //  Fetch user data immediately after signup
      let userRes = await JoblyApi.request("auth/me");
      setCurrentUser(userRes.user);
  
    } catch (err) {
      console.error("Signup failed:", err);
      throw new Error("Signup failed. Please try again.");
    }
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      <BrowserRouter>
        <NavBar />
        <AppRoutes login={login} signup={signup} currentUser={currentUser} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;