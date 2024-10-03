// UserProfile.js
import React, { useState } from 'react';

const UserProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = () => {
    // Logic to update user profile can be implemented here
    // For now, we just toggle the editing state
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          {isEditing ? "Update Profile" : "User Profile"}
        </h2>
        <div className="flex flex-col items-center">
          <img
            src={profilePicture}
            alt={name}
            className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300 shadow-lg"
          />
          {isEditing ? (
            <>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 mb-4 text-lg font-semibold text-gray-700 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 text-lg font-semibold text-gray-700 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mt-4 transition duration-300"
                onClick={handleUpdateProfile}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-800 font-semibold mb-2">{name}</p>
              <p className="text-md text-gray-600 mb-4">{email}</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
