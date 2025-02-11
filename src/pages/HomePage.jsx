import React from "react";

function HomePage({ currentUser }) {
  return (
    <div>
      <h1>Jobly</h1>
      {currentUser ? (
        <h2>Welcome back, {currentUser.firstName}!</h2>
      ) : (
        <h2>Find your dream job today. Please log in or sign up.</h2>
      )}
    </div>
  );
}

export default HomePage;