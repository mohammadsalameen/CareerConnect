import mongoose, { model, Schema }  from "mongoose";

const userSchema = new Schema ({
    name : {
        type : String,
        required : true,
        trim : true,
        min : 2,
        max : 20
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 20
    },
    role : {
        type : String,
        enum : ['admin', 'employer', 'applicant'],
        default : 'applicant'
    },
    companyName : String
},
{
    timestamps : true
});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;