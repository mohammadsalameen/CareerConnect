import jobModel from "../../../DB/models/job.model.js";

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