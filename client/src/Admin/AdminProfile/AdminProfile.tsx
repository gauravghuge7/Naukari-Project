import React, { useEffect, useState } from 'react';
import { extractErrorMessage } from '../../Components/ResponseError/ResponseError';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    adminName: 'John Doe',
    adminEmail: 'john@example.com',
    adminBio: 'Software engineer with a passion for building web applications.',
    adminAddress: 'New York, USA',
    adminProfilePicture: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axios.get('/api/admin/profile/fetchProfile', config);

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
      setError(message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const response = await axios.post('/api/admin/profile/updateProfile', profile, config);

      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setProfile(formData); // Update profile with new data
        setIsEditing(false); // Exit edit mode
        fetchProfile();
      } 

    } 
    catch (error) {
      console.error('Error updating profile:', error);
      const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
      setError(message);
      toast.error(message);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const response = await axios.post('/api/admin/profile/uploadProfilePicture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        if (response.data.success) {
          toast.success('Profile image uploaded successfully!');
          // Update profile image URL if returned from the server
          // setProfile({ ...profile, imageUrl: response.data.imageUrl });
        }
      } 
      catch (error) {
        console.error('Error uploading image:', error);
        const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
        setError(message);
        toast.error(message);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">

      <ToastContainer position="top-right" />

      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md transition-all duration-300 transform hover:scale-105">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-md transition-transform duration-300 transform hover:scale-110"
            src={profile.adminProfilePicture || "https://via.placeholder.com/150"}
            alt="profile"
          />
          {!isEditing ? (
            <>
              <h2 className="text-3xl font-bold text-gray-800 transition-colors duration-300">{profile.adminName}</h2>
              <p className="text-gray-500 mb-2">{profile.adminEmail}</p>
              <p className="mt-2 text-gray-700 text-center leading-relaxed">{profile.adminBio}</p>
              <p className="mt-1 text-gray-500">{profile.adminAddress}</p>
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSave}>

              <div>
                <input 
                  type="file" 
                  name="profileImage" 
                  onChange={handleImageUpload} 
                />
              </div>
              
              <div className="w-full">
                <label className="block text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  name="adminName"
                  value={profile.adminName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded mt-1 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  name="adminEmail"
                  value={profile.adminEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded mt-1 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700 font-semibold">Bio</label>
                <textarea
                  name="adminBio"
                  value={profile.adminBio}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded mt-1 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                ></textarea>
              </div>
              <div className="w-full">
                <label className="block text-gray-700 font-semibold">Location</label>
                <input
                  type="text"
                  name="adminAddress"
                  value={profile.adminAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded mt-1 mb-4 shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="px-6 py-2 bg-gray-500 text-white font-semibold rounded shadow-md transition-all duration-300 hover:bg-gray-600 hover:shadow-lg"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>

              {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
