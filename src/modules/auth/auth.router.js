import { Router } from "express";
import { loginValidation, registerValidation } from "./auth.validation.js";
import * as authController from "./auth.controller.js";
import validation from "../../middleware/validation.js";
import asyncHandler from "../../utils/catchError.js"; 

const router = Router();

router.post('/register',validation(registerValidation), asyncHandler(authController.register));
router.post('/login',validation(loginValidation), asyncHandler(authController.login));

export default router;