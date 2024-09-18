import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

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


const options = {
   httpOny: true,
   secure: true
}

const registerAdmin = asyncHandler(async (req, res, next) => {

   try {

      const { adminName, adminEmail, adminPassword } = req.body;

      

      

      

   } 
   catch (error) {
      console.log(error.message);
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

      const isPasswordCorrect = await bcrypt.compare(adminPassword, admin.adminPassword);

      if(!isPasswordCorrect) {
         throw new ApiError(400, "Invalid Password");
      }

      const {adminAccessToken, adminSecretToken} = await generateAccessAndSecretToken(admin._id);

      return res 
      .status(200)
      .cookie("adminAccessToken", adminAccessToken, options)
      .cookie("adminSecretToken", adminSecretToken, options)
      .json(
         new ApiResponse(200, "Login Successful", adminAccessToken)
      )
   }
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }
})




export {
   registerAdmin,
   loginAdmin
}