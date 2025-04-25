import applicationModel from "../../DB/models/application.model.js";

export const findApplicationByJobAndApplicant = (jobId, applicantId) =>
  applicationModel.findOne({ job: jobId, applicant: applicantId });

export const createApplication = async (jobId, applicantId, cvUrl) => {
  return await applicationModel.create({
    job: jobId,
    applicant: applicantId,
    cv: cvUrl,
  });
};

export const findAppById = async (applicant) =>
  await applicationModel
    .find({applicant})
    .populate("job", "title description location salary category postedBy")
    .populate("applicant", "name email");

export const findAppByIdAndUpdate = async (applicationId, status) => await applicationModel.findByIdAndUpdate(
    applicationId,
    { status },
    { new: true }
  ).populate([
    { path: 'applicant', select: 'name email' },
    { path: 'job', select: 'title' }
  ]);