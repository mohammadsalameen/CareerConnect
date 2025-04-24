import { Router } from "express";
import * as applicationController from "./application.controller.js";
import auth from "../../middleware/auth.js";
import fileUpload, { fileValidation } from "../../utils/multer.js";
import asyncHandler from "../../middleware/catchError.js";

const router = Router();

router.post('/apply',auth(['applicant']), fileUpload(fileValidation.pdf).fields([
    { name: 'cv', maxCount: 1 }
]), asyncHandler(applicationController.applyJob));

export default router;