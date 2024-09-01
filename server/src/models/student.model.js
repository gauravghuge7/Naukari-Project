import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const studentSchema = new Schema({

   studentName: {
      type: String,
      required: true,

   },
   studentEmail: {
      type: String,
      required: true,
      unique: true
   },
   studentPassword: {

      type: String,
      required: true
   },

   studentPasswordToken: {
      type: String,
   },

   studentAddress: {
      type: String,
      required: true
   },
   studentPhone: {
      type: String,
      required: true
      
   },

   studentRefreshToken: {
      type: String,
   }


}, {timestamps: true});


studentSchema.methods = {

   generateStudentAccessToken: function () {

      return jwt.sign(
         {
            _id: this._id,
            studentEmail: this.studentEmail,
         },
         process.env.STUDENT_ACCESS_TOKEN,
         {
            expiresIn: "24h"
         }
      )
   },

   generateStudentSecretToken: function () {
      return jwt.sign(
         {
            _id: this._id,
            studentEmail: this.studentEmail,
         },
         process.env.STUDENT_SECRET_TOKEN,
         {
            expiresIn: "24h"
         }
      )
   }


}


studentSchema.pre("save", function (next) {

   if(this.isModified("studentPassword")){


      const passwordToken = jwt.sign(
         {
            _id: this._id,
            studentEmail: this.studentEmail,
            studentPassword: this.studentPassword,
         },
         process.env.STUDENT_PASSWORD_TOKEN,
         {
            expiresIn: "1y"
         }
      )

      this.studentPasswordToken = passwordToken

      this.studentPassword = bcrypt.hashSync(this.studentPassword, 10);
   }
   next()
})


export const Student = model("Student", studentSchema);