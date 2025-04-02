import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const isStudentLogin = asyncHandler(async(req, res, next) => {

   try {
      
      console.log("req.cookies => ", req.cookies)
      const studentAccessToken = req.cookies.studentAccessToken;


      if (!studentAccessToken) {
         
         return res
         .status(401)
         .clearCookie("studentAccessToken")
         .clearCookie("studentSecretToken")
         .json(
            new ApiResponse(401, "student access token not found")
         )
      }

      const decoded = await jwt.verify(studentAccessToken, process.env.STUDENT_ACCESS_TOKEN);

      req.user = decoded;
      next();

   } 
   catch (error) {
      throw new ApiError(401, error.message)
   }
})

export {
   isStudentLogin
}