import { useEffect, useState } from 'react';
import { FaEdit, FaMobileAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { extractErrorMessage } from '../../components/ResponseError/ResponseError';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [mobileNumber, setMobileNumber] = useState('123-456-7890');
  const [whatsappNumber, setWhatsappNumber] = useState('123-456-7890');
  const [bio, setBio] = useState('Hello! I am a software developer.');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
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

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await axios.post("/api/student/profile/updateProfile", formData, config);

      if (response.data.success) {
        setIsEditing(false);
        toast.success("Profile updated!");
      }
    } catch (error) {
      const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
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

      setName(response.data.data.studentName);
      setEmail(response.data.data.studentEmail);
      setMobileNumber(response.data.data.studentPhone);
      setWhatsappNumber(response.data.data.studentWhatsapp);
      setBio(response.data.data.studentBio);
      setProfilePicture(response.data.data.studentProfilePicture);
    } 
    catch (error) {
      const message = extractErrorMessage((error as AxiosError)?.response?.data as string);
      toast.error(message);

      const axiosError = error as AxiosError<{ message: string }>;
      const data = axiosError?.response?.data;

      console.log("data => ", data);

      if (data && data.message === "student access token not found") {
        localStorage.removeItem("NaukariUser");
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEditing ? 'Update Profile' : 'User Profile'}
        </h2>
        <div className="flex flex-col items-center">
          <img
            src={
              profilePicture
                ? typeof profilePicture === 'string'
                  ? profilePicture
                  : URL.createObjectURL(profilePicture)
                : "https://via.placeholder.com/150"
            }
            alt={name}
            className="w-32 h-32 rounded-full mb-6 border-2 border-gray-500 shadow-md"
          />
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="w-full space-y-4">
    <div>
      <label className="block text-sm font-semibold mb-1">Profile Picture</label>
      <input
        type="file"
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
        onChange={handleProfilePictureChange}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">Name</label>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
        <FaEnvelope /> Email
      </label>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
        <FaMobileAlt /> Mobile Number
      </label>
      <input
        type="text"
        placeholder="Mobile Number"
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
        <FaWhatsapp /> WhatsApp Number
      </label>
      <input
        type="text"
        placeholder="WhatsApp Number"
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none"
        value={whatsappNumber}
        onChange={(e) => setWhatsappNumber(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-1">Bio</label>
      <textarea
        placeholder="Bio"
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={3}
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition"
    >
      Save Changes
    </button>
  </form>
          ) : (
            <>
              <p className="text-xl font-semibold mb-2">{name}</p>
              <p className="text-md text-gray-300 mb-2">{email}</p>
              <p className="text-md text-gray-300 mb-2">Mobile: {mobileNumber}</p>
              <p className="text-md text-gray-300 mb-2">WhatsApp: {whatsappNumber}</p>
              <p className="text-md text-gray-300 mb-6">{bio}</p>
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition"
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
