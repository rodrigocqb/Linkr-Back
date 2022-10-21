import loginSchema from "../schemas/loginSchema.js";

const validateLogin = (req, res, next) => {

    const dataLogin= req.body;

    const validation = loginSchema.validate(dataLogin);

    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    next();

};

export default validateLogin;