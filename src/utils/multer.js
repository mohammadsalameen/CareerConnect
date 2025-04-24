import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

export const fileValidation = {
    pdf : ['application/pdf'],
    image : ['image/jpeg', 'image/png', 'image/jpg']
}

const fileUpload = (customValidation = []) => {
    const storage = multer.diskStorage({
    });

    const fileFilter = (req, file, cb) => {
        if(customValidation.includes(file.mimetype)){
            cb(null, true);
    }else{
            cb(new Error('Invalid file type'), false);
        }
    }

    const upload = multer({fileFilter, storage});
    return upload;
}

export default fileUpload;
