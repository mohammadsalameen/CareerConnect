import userModel from "../../DB/models/user.model.js";

export const findUserByEmail = async (email) => await userModel.find({email});

export const createUser = async (name, email, hashedPassword) => await userModel.create({name, email, password: hashedPassword})

export const findOneUser = async (email) => await userModel.findOne({email});

export const findUserById = async (userId) => userModel.findById(userId);