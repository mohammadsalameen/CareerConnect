import userModel from "../../DB/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import jwt from 'jsonwebtoken';

const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        const {token} = req.headers;

        if(!token) return next(new AppError('Unauthorized', 401));

        const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
        const user = await userModel.findById(decoded.id);

        if(!accessRoles.includes(user.role) == 'applicant') {
            return next(new AppError('Unauthorized', 401));
        }

        req.id = decoded.id;

        next();
    }
}
export default auth;