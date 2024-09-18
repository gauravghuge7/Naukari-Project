import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new Schema({

   adminName: {
      type: String,
      required: true,
   },

   adminEmail: {
      type: String,
      required: true,
      unique: true
   },

   adminPassword: {
      type: String,
      required: true
   },

   adminPasswordToken: {
      type: String,
   },

   adminAddress: {
      type: String,
      required: true
   },

   adminRefreshToken: {
      type: String,
   }

}, {timestamps: true});




adminSchema.methods = {

   generateAdminAccessToken: function () {
      return jwt.sign(
         {
            _id: this._id,
            adminEmail: this.adminEmail,
         },
         process.env.ADMIN_ACCESS_TOKEN,
         {
            expiresIn: "24h"
         }
      )
   },
   generateAdminSecretToken: function () {
      return jwt.sign(
         {
            _id: this._id,
            adminEmail: this.adminEmail,
         },
         process.env.ADMIN_SECRET_TOKEN,
         {
            expiresIn: "24h"
         }
      )
   }

}


/// create for saving encrypted password
adminSchema.pre("save", function (next) {

   if(this.isModified("adminPassword")){

      const passwordToken = jwt.sign(
         {
            _id: this._id,
            adminEmail: this.adminEmail,
            adminPassword: this.adminPassword,
         },
         process.env.ADMIN_PASSWORD_TOKEN,
         {
            expiresIn: "1y"
         }
      )

      this.adminPasswordToken = passwordToken

      this.adminPassword = bcrypt.hashSync(this.adminPassword, 10);
   }
   next()
})


export const Admin = model("Admin", adminSchema);