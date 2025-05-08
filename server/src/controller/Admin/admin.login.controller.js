import { Admin } from '../../models/Admin/admin.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const generateAccessAndSecretToken = async (_id) => {

   try {

      const admin = await Admin.findById(_id);

      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      const adminAccessToken = admin.generateAdminAccessToken();
      const adminSecretToken = admin.generateAdminSecretToken();

      admin.adminRefreshToken = adminAccessToken;
      await admin.save({ validateBeforeSave: false });

      return {
         adminAccessToken,
         adminSecretToken
      }

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }

}


// common options for all users
const options = {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'None',
   maxAge: 7 * 24 * 60 * 60 * 1000,
};


// register a admin controller here 
const registerAdmin = asyncHandler(async (req, res, next) => {

   try {

      const { adminName, adminEmail, adminPassword } = req.body;

      ("req.body => ", req.body);

      if(
         [adminName, adminEmail, adminPassword].some((field) => field.trim() === "")
      ) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      if(!adminName || !adminEmail || !adminPassword) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const existingAdmin = await Admin.findOne({ adminEmail });

      if(existingAdmin) {
         throw new ApiError(400, "Admin Already Exists");
      }

      

      // create a new admin with triming the fields 

      const admin = await Admin.create({
         adminName,
         adminEmail,
         adminPassword
      })
      (" after existing the admin");

      return res 
      .status(201)
      .json(
         new ApiResponse(201, "Admin Registration Successful", admin)
      )

   } 
   catch (error) {
      (error.message);
      throw new ApiError(400, error.message, error);
   }

})



const loginAdmin = asyncHandler(async (req, res, next) => {

   try {

      const { adminEmail, adminPassword } = req.body;

      if(!adminEmail || !adminPassword) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const admin = await Admin.findOne({ adminEmail });

      if(!admin) {
         throw new ApiError(400, "Admin Not Found");
      }

      const isPasswordCorrect = await admin.isAdminPasswordCorrect(adminPassword);

      if(!isPasswordCorrect) {
         throw new ApiError(400, "Invalid Password");
      }

      const {adminAccessToken, adminSecretToken} = await generateAccessAndSecretToken(admin._id);

      return res 
      .status(200)
      .cookie("adminAccessToken", adminAccessToken, options)
      .cookie("adminSecretToken", adminSecretToken, options)
      .json(
         new ApiResponse(200, "Admin Login Successfully ", admin)
      )
   }
   catch (error) {
      (error.message);
      throw new ApiError(400, error.message, error);
   }
})

export { loginAdmin, registerAdmin };