// UserProfile.js
import React, { useState } from 'react';

const UserProfile = () => {
  const [name , setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');

  const handleUpdateProfile = () => {
    // Update user profile logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
        <h2 className="text-lg font-bold mb-2">User Profile</h2>
        <div className="flex flex-col items-center">
          <img src={profilePicture} alt={name} className="w-24 h-24 rounded-full mb-2" />
          <p className="text-gray-600">{name}</p>
          <p className="text-gray-600">{email}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;