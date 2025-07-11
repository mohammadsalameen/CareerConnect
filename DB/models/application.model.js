import mongoose, { Schema, Types } from "mongoose";

const applicationSchema = new Schema({
    applicant : {
        type : Types.ObjectId,
        ref : 'User',
        required : true
    },
    job : {
        type : Types.ObjectId,
        ref : 'Job',
        required : true
    },
    cv : {
        type : Object,
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'interview', 'accepted', 'rejected'],
        default : 'pending'
    }
},
{
    timestamps : true
});

const applicationModel = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default applicationModel;