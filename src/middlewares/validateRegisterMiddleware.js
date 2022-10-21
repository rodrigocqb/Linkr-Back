import registerSchema from "../schemas/registerSchema.js";

const validateRegister = (req, res, next) => {

    const dataRegister= req.body;

    const validation = registerSchema.validate(dataRegister);

    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    next();

};

export default validateRegister;