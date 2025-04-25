import bcrypt from 'bcrypt';
import { AppError } from "../../utils/AppError.js";
import jwt from 'jsonwebtoken';
import sendEmail from "../../utils/sendEmail.js";
import { getEmailMessage } from "../../utils/htmlMessages.js";
import { createUser, findOneUser, findUserByEmail } from "../../repository/userRepo.js";

export const register = async (req, res, next) =>{
    const {name, email, password} = req.body;

    const user = await findUserByEmail(email);
    if(user.length) return res.status(409).json({message: 'Email already exists'});

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const newUser = await createUser(name, email, hashedPassword);

    await sendEmail(email, 'Welcome to our platform', getEmailMessage({name}));

    if(!newUser) return next (new AppError('Failed to create user', 500));
    return res.status(201).json({message: 'User registered successfully', user: newUser});
}

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await findOneUser(email);
    if(user == null) return next(new AppError('Invalid data', 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return next(new AppError('Invalid data', 404));

    const token = jwt.sign({id: user._id, role : user.role}, process.env.LOGIN_SECRET, {expiresIn: '1w'});

    return res.status(200).json({message: 'Login successfully', token});
}