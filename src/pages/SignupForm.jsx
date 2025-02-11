import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {  // ✅ Receives `signup` as a prop
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [error, setError] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("🚀 Signup Form Submitted!", formData);
    
    try {
      await signup(formData);  // ✅ Calls signup function
      navigate("/"); // ✅ Redirect to homepage after signup
    } catch (err) {
      console.error("Signup Failed:", err);
      setError("Signup failed. Please try again.");
    }
  }

  return (
    <div className="SignupForm">
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" value={formData.username} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />

        <label htmlFor="firstName">First Name:</label>
        <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;