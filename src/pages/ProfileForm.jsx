import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext"; // ✅ Get current user
import JoblyApi from "../api/api"; // ✅ API helper
import "./ProfileForm.css"; // ✅ Optional for styling

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext); // ✅ Get user & update function

  // Set initial state with current user info
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    password: "", // Password required to confirm changes
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  /** Handle input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  /** Handle form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsUpdating(true);

    try {
      // API call to update user profile
      let updatedUser = await JoblyApi.updateUser(currentUser.username, formData);
      setCurrentUser(updatedUser); // ✅ Update context state
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      setMessage(err[0]); // Show error message
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="ProfileForm">
      <h2>Update Profile</h2>

      {message && <p className="ProfileForm-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password (required to confirm changes):</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;