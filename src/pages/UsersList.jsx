import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";  // Make sure this path is correct

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        let users = await JoblyApi.getUsers();
        setUsers(users);
      } catch (err) {
        console.error("Error loading users", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.username}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;