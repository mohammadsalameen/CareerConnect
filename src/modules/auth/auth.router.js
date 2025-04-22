import { Router } from "express";
import * as authController from "./auth.controller.js";
import validation from "../../middleware/validation.js";
import { registerValidation } from "./auth.validation.js";

const router = Router();

router.get('/register',validation(registerValidation),  authController.register);

export default router;