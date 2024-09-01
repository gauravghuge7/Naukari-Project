import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const generateAccessAndSecretToken = async (_id) => {

   try {

      const student = await Student.findById(_id);

      if(!student) {
         throw new ApiError(400, "Student Not Found");
      }

      const studentAccessToken = student.generateStudentAccessToken();
      const studentSecretToken = student.generateStudentSecretToken();

      student.studentRefreshToken = studentAccessToken;
      await student.save({ validateBeforeSave: false });

      return {
         studentAccessToken,
         studentSecretToken
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

const registerStudent = asyncHandler(async (req, res, next) => {

   try {

      const { studentName, studentEmail, studentPassword } = req.body;

      if(!studentName || !studentEmail || !studentPassword) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const student = await Student.create({
         studentName,
         studentEmail,
         studentPassword
      });

      return res 
      .status(201)
      .json(
         new ApiResponse(201, "Student Registered Successfully", student)
      )

      
   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }

})


const loginStudent = asyncHandler(async (req, res, next) => {

   try {

      const { studentEmail, studentPassword } = req.body;

      if(!studentEmail || !studentPassword) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      const student = await Student.findOne({ studentEmail });

      if(!student) {
         throw new ApiError(400, "Student Not Found");
      }

      const isPasswordCorrect = await bcrypt.compare(studentPassword, student.studentPassword);

      if(!isPasswordCorrect) {
         throw new ApiError(400, "Invalid Password");
      }

      const {studentAccessToken, studentSecretToken} = await generateAccessAndSecretToken(student._id);

      

      return res 
      .status(200)
      .cookie("studentAccessToken", studentAccessToken, options)
      .cookie("studentSecretToken", studentSecretToken, options)
      .json(
         new ApiResponse(200, "Login Successful", studentAccessToken)
      )

   } 
   catch (error) {
      console.log(error.message);
      throw new ApiError(400, error.message, error);
   }

})



export {
   registerStudent,
   loginStudent
}