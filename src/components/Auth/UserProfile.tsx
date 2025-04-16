import React from "react";
import "./UserProfile.css";


interface UserProfileProps {
  user: {
    email: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile; 