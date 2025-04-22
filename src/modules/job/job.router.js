import { Router } from "express";
import asyncHandler from "../../utils/catchError.js";
import * as jobController from "./job.controller.js";
import auth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import { createJobSchema } from "./job.validation.js";

const router = Router();

router.post('/create',validation(createJobSchema), auth(['admin', 'employer']), asyncHandler(jobController.createJob));
router.get('/', asyncHandler(jobController.getAllJobs));

export default router;