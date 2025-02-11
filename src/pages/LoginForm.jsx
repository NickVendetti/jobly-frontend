import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {  //  login is now received as a prop
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("🚀 Form Submitted!", formData);
    
    try {
      await login(formData.username, formData.password);  //  Call login function
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error(" Login Failed:", err);
      setError("Invalid username/password. Please try again.");
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;