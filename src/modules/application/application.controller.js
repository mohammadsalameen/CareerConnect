import applicationModel from "../../../DB/models/application.model.js";
import jobModel from "../../../DB/models/job.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";

export const applyJob = async (req, res, next) => {
    const { jobId } = req.body;

    const job = await jobModel.findById(jobId);
    if(!job) return next(new AppError('Job not found', 404));

    const existingApplication = await applicationModel.findOne({job : jobId, applicant : req.id});
    if(existingApplication) return next(new AppError('Already applied for this job', 409));

    if(!req.files || !req.files.cv) return next(new AppError('CV is required', 400));

    const uploaded= await cloudinary.uploader.upload(req.files.cv[0].path, {
        folder : `${process.env.APP_NAME}/cv`
    });

    const application = await applicationModel.create({
        job : jobId,
        applicant : req.id,
        cv : uploaded.secure_url
    });
    job.applicants.push(req.id);
    await job.save();

    if(!application) return next(new AppError('Failed to apply for job', 500));

    return res.status(201).json({message: 'Applied for job successfully', application});
}

export const getMyApplications = async (req, res, next) => {
    const applications = await applicationModel.find({applicant : req.id}).populate('job', 'title description location salary category postedBy').populate('applicant', 'name email');

    if(!applications) return next(new AppError('Failed to get applications', 500));

    return res.status(200).json({message: 'Applications fetched successfully', applications});
}

export const getJobApplications = async (req, res, next) => {
    const {jobId} = req.params;
    
    const job = await jobModel.findById(jobId);
    if(!job) return next(new AppError('Job not found', 404));

    const applications = await applicationModel.find({job : jobId}).populate('applicant', 'name email');
    if(!applications) return next(new AppError('Failed to get applications', 500));
    if(applications.length === 0) return next(new AppError('No applications found', 404));

    return res.status(200).json({message: 'Applications fetched successfully', applications});
}