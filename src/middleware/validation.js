const validation = (schema) => {
    return (req, res, next) => {
        const inputData = {...req.body, ...req.params};
        const validateResult = schema.validate(inputData, {abortEarly: false});

        if(validateResult?.error){
            return res.status(400).json({
                message: 'Validation error',
                error: validateResult.error.details.map((err) => err.message)
            });
        }
        next();
    }
}

export default validation;