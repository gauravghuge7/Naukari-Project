import express from 'express';
import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../controller/Admin/admin.login.controller.js';

const adminRouter = Router();

adminRouter.route("/register").post(
   registerAdmin
)

export default adminRouter;