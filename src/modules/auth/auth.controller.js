import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) =>{
    const {name, email, password} = req.body;

    const user = await userModel.find({email});
    if(user.length) return res.status(409).json({message: 'Email already exists'});
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const newUser = await userModel.create({name, email, password: hashedPassword});

    if(!newUser) return res.status(500).json({message: 'Failed to register user'});
    return res.status(201).json({message: 'User registered successfully', user: newUser});

}