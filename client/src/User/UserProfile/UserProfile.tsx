import { useEffect, useState } from 'react';
import { FaEdit, FaMobileAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Importing icons
import { extractErrorMessage } from '../../Components/ResponseError/ResponseError';
import axios, { AxiosError } from 'axios';

const UserProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [mobileNumber, setMobileNumber] = useState('123-456-7890');
  const [whatsappNumber, setWhatsappNumber] = useState('123-456-7890');
  const [bio, setBio] = useState('Hello! I am a software developer.');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150'); // Default profile picture
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = () => {
    setIsEditing(false);
    alert('Profile updated!');
  };

  const fetchProfile = async() => {
      try {

        const config = {
          headers: {
            "content-type": "multipart/formdata"
          },
          withCredentials: true
        }
        const response = await axios.get("/api/student/profile/fetchprofile", config);

        console.log("response", response.data);
      } 
      catch (error) {
        const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
        console.log("Error", message)  
      }
  }

  useEffect(() => {
    fetchProfile();
  }, [name]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          {isEditing ? 'Update Profile' : 'User Profile'}
        </h2>
        <div className="flex flex-col items-center">
          <img
            src={profilePicture}
            alt={name}
            className="w-32 h-32 rounded-full mb-6 border-2 border-gray-300 shadow-md"
          />
          {isEditing ? (
            <>
              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full mb-4 flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full mb-4 flex items-center">
                <FaMobileAlt className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className="w-full mb-4 flex items-center">
                <FaWhatsapp className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="WhatsApp Number"
                  className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </div>
              <textarea
                placeholder="Bio"
                className="w-full p-3 mb-4 text-lg border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
              <button
                className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-gray-700 transition-colors"
                onClick={handleUpdateProfile}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <p className="text-xl text-gray-700 font-semibold mb-2">{name}</p>
              <p className="text-md text-gray-600 mb-2">{email}</p>
              <p className="text-md text-gray-600 mb-2">Mobile: {mobileNumber}</p>
              <p className="text-md text-gray-600 mb-2">WhatsApp: {whatsappNumber}</p>
              <p className="text-md text-gray-600 mb-6">{bio}</p>
              <button
                className="bg-gray-800 text-white font-bold py-2 px-6 rounded-full hover:bg-gray-700 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit className="inline-block mr-2" />
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
