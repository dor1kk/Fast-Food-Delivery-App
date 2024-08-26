// components/Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2> {/* Display user's name */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
