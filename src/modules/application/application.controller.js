
import { createApplication, findAppById, findAppByIdAndUpdate, findApplicationByJobAndApplicant, findApplicationsByJobId } from "../../repository/applicationRepo.js";
import { findJobById } from "../../repository/jobRepo.js";
import { findUserById } from "../../repository/userRepo.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import { getJobApplicationEmail, getStatusUpdateEmail } from "../../utils/htmlMessages.js";
import sendEmail from "../../utils/sendEmail.js";

export const applyJob = async (req, res, next) => {
    const { jobId } = req.body;

    const job = await findJobById(jobId);
    if(!job) return next(new AppError('Job not found', 404));

    const existingApplication = await findApplicationByJobAndApplicant( jobId,  req.id);
    if(existingApplication) return next(new AppError('Already applied for this job', 409));

    if(!req.files || !req.files.cv) return next(new AppError('CV is required', 400));

    const uploaded= await cloudinary.uploader.upload(req.files.cv[0].path, {
        folder : `${process.env.APP_NAME}/cv`
    });

    const application = await createApplication(jobId, req.id, uploaded.secure_url);
    job.applicants.push(req.id);
    await job.save();

    const applicant = await findUserById(req.id);
    if (applicant?.email) {
      await sendEmail(
        applicant.email,
        'Job Application',
        getJobApplicationEmail({name : applicant.name, jobTitle : job.title})
      );
    }  
    if(!application) return next(new AppError('Failed to apply for job', 500));

    return res.status(201).json({message: 'Applied for job successfully', application});
}

export const getMyApplications = async (req, res, next) => {
    const applications = await findAppById(req.id);

    if(!applications) return next(new AppError('Failed to get applications', 500));

    return res.status(200).json({message: 'Applications fetched successfully', applications});
}

export const getJobApplications = async (req, res, next) => {
    const {jobId} = req.params;

    const job = await findJobById(jobId);
    if(!job) return next(new AppError('Job not found', 404));

    const applications = await findApplicationsByJobId(jobId);
    if(!applications) return next(new AppError('Failed to get applications', 500));
    if(applications.length === 0) return next(new AppError('No applications found', 404));
    return res.status(200).json({message: 'Applications fetched successfully', applications});
}

export const updateApplicationStatus = async (req, res, next) => {
    const {applicationId} = req.params;
    const {status} = req.body;
    if(!['accepted', 'rejected', 'interview'].includes(status)) return next(new AppError('Invalid status', 400));

    const application = await findAppByIdAndUpdate(applicationId, status);
    if(!application) return next(new AppError('application not found', 404));

    await sendEmail(application.applicant.email, 'Career Connect Status ', getStatusUpdateEmail({name : application.applicant.name, status, jobTitle : application.job.title}));
    return res.status(200).json({message: 'Application status updated successfully', application});
}