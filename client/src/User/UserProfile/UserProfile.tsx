import { useEffect, useState } from 'react';
import { FaEdit, FaMobileAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { extractErrorMessage } from '../../Components/ResponseError/ResponseError';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [mobileNumber, setMobileNumber] = useState('123-456-7890');
  const [whatsappNumber, setWhatsappNumber] = useState('123-456-7890');
  const [bio, setBio] = useState('Hello! I am a software developer.');
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // Now storing the file itself
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const formData = new FormData();
      formData.append("studentName", name);
      formData.append("studentEmail", email);
      formData.append("studentMobile", mobileNumber);
      formData.append("studentWhatsapp", whatsappNumber);
      formData.append("studentBio", bio);

      // Add file if it exists
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      console.log("formData entries:", Array.from(formData.entries())); // Log to verify formData

      const response = await axios.post("/api/student/profile/updateProfile", formData, config);

      console.log("response", response.data);

      if (response.data.success) {
        setIsEditing(false);
        toast.success("Profile updated!");
      }
    } catch (error) {
      const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
      console.log("Error", message);
      toast.error(message);
    }
  };

  const fetchProfile = async () => {
    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        },
        withCredentials: true
      };
      const response = await axios.get("/api/student/profile/fetchprofile", config);

      console.log("response", response.data);

      setName(response.data.data.studentName);
      setEmail(response.data.data.studentEmail);
      setMobileNumber(response.data.data.studentPhone);
      setWhatsappNumber(response.data.data.studentWhatsapp);
      setBio(response.data.data.studentBio);
      setProfilePicture(response.data.data.studentProfilePicture);
    } catch (error) {
      const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
      console.log("Error", message);
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file); // Set the actual file object
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          {isEditing ? 'Update Profile' : 'User Profile'}
        </h2>
        <div className="flex flex-col items-center">
          <img
            src={profilePicture ? profilePicture: "https://via.placeholder.com/150"}
            alt={name}
            className="w-32 h-32 rounded-full mb-6 border-2 border-gray-300 shadow-md"
          />
          {isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="w-full mb-4">
                <input
                  type="file"
                  className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  onChange={handleProfilePictureChange}
                />
              </div>

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
                type="submit"
              >
                Save Changes
              </button>
            </form>
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
