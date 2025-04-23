import { Router } from "express";
import asyncHandler from "../../middleware/catchError.js";
import * as jobController from "./job.controller.js";
import auth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import { createJobSchema } from "./job.validation.js";

const router = Router();

router.post('/create',validation(createJobSchema), auth(['employer']), asyncHandler(jobController.createJob));
router.get('/', asyncHandler(jobController.getAllJobs));
router.get('/my-jobs', auth(['employer']), asyncHandler(jobController.getMyJobs));
router.get('/:id', asyncHandler(jobController.getJobById));
router.put('/:id', auth(['employer']), asyncHandler(jobController.updateJob));
router.delete('/:id', auth(['admin', 'employer']), asyncHandler(jobController.deleteJob));

export default router;