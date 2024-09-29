import React, { useState } from 'react'

const AdminProfile = () => {
   const [profile, setProfile] = useState({
      adminName: 'John Doe',
      adminEmail: 'john@example.com',
      adminBio: 'Software engineer with a passion for building web applications.',
      adminLocation: 'New York, USA',
    });
  
    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);
  
    // Temp state for form input
    const [formData, setFormData] = useState(profile);
  
    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Save changes
    const handleSave = () => {
      setProfile(formData);
      setIsEditing(false);
    };
  
    // Cancel editing
    const handleCancel = () => {
      setFormData(profile);
      setIsEditing(false);
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full object-cover mb-4"
              src="https://via.placeholder.com/150"
              alt="profile"
            />
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-bold">{profile.adminName}</h2>
                <p className="text-gray-600">{profile.adminEmail}</p>
                <p className="mt-2 text-gray-700 text-center">{profile.adminBio}</p>
                <p className="mt-1 text-gray-500">{profile.adminLocation}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <div className="w-full">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-700">Bio</label>
                  <textarea
                    name="adminBio"
                    value={formData.adminBio}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
                  ></textarea>
                </div>
                <div className="w-full">
                  <label className="block text-gray-700">Location</label>
                  <input
                    type="text"
                    name="adminLocation"
                    value={formData.adminLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 mb-4"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
   );
}

export default AdminProfile;