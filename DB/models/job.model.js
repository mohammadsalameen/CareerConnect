import mongoose, { Schema, Types } from "mongoose";

const jobSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    postedBy : {
        type : Types.ObjectId,
        ref : 'User',
        required : true
    },
    applicants : [
        {
            type : Types.ObjectId,
            ref : 'Application'
        }
    ]
},
{
    timestamps : true
});

const jobModel = mongoose.models.Job || mongoose.model('Job', jobSchema);
export default jobModel;
