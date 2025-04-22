import { Router } from "express";
import * as authController from "./auth.controller.js";
import validation from "../../middleware/validation.js";
import { registerValidation } from "./auth.validation.js";
import asyncHandler from "../../utils/catchError.js";

const router = Router();

router.post('/register',validation(registerValidation), asyncHandler(authController.register));

export default router;