import jobModel from "../../DB/models/job.model.js";

export const createJobRepo = async (
  title,
  description,
  location,
  salary,
  category,
  postedBy
) =>
  await jobModel.create({
    title,
    description,
    location,
    salary,
    category,
    postedBy,
  });

export const findJobs = async (filter = {}) =>
  await jobModel.find(filter).populate("postedBy", "name email");

export const findJobByIdAndUpdate = async (
    id,
  title,
  description,
  location,
  category,
  salary
) =>
  await jobModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      location,
      category,
      salary,
    },
    { new: true }
  );

  export const findJobByIdAndDelete = async (id) => await jobModel.findByIdAndDelete(id);

  export const findJobById = async (jobId) => await jobModel.findById(jobId).populate('postedBy', 'name email');