import jobModel from "../../../DB/models/job.model.js";
import { AppError } from "../../utils/AppError.js";

export const createJob = async (req, res, next) => {
    const {title, description, location,category, salary} = req.body;

    const job = await jobModel.create({
        title,
        description,
        location,
        salary,
        category,
        postedBy: req.id
    });
    if(!job) return next(new AppError('Failed to create job', 500));

    return res.status(201).json({message: 'Job created successfully', job});
}

export const getAllJobs = async (req, res, next) => {
    const jobs = await jobModel.find().populate('postedBy', 'name email');

    if(!jobs) return next(new AppError('Failed to get jobs', 500));

    return res.status(200).json({message: 'Jobs fetched successfully', jobs});
}

export const getJobById = async (req, res, next) => {
    const {id} = req.params;

    const job = await jobModel.findById(id).populate('postedBy', 'name email');
    if(!job) return next(new AppError('Failed to get job', 500));

    return res.status(200).json({message: 'Job fetched successfully', job});
}

export const updateJob = async (req, res, next) => {
    const {id} = req.params;
    const {title, description, location, category, salary} = req.body;

    const job = await jobModel.findByIdAndUpdate(id, {
        title,
        description,
        location,
        category,
        salary
    }, {new: true});

    if(!job) return next(new AppError('Failed to update job', 500));

    return res.status(200).json({message: 'Job updated successfully', job});
}

export const deleteJob = async (req, res, next) => {
    const {id} = req.params;

    const job = await jobModel.findByIdAndDelete(id);
    if(!job) return next(new AppError('Failed to delete job', 500));

    return res.status(200).json({message: 'Job deleted successfully'});
}

export const getMyJobs = async (req, res, next) => {
    const jobs = await jobModel.find({postedBy : req.id}).populate('postedBy', 'name email');
    if(!jobs) return next(new AppError('Failed to get jobs', 500));

    return res.status(200).json({message: 'Jobs fetched successfully', jobs});
}