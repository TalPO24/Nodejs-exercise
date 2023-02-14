const Joi = require("joi");
const validate = require("./validate");

//* register
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(255).required().trim(),
    email: Joi.string().email().min(8).max(255).required().trim(),
    password: Joi.string()
        .regex(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
            )
        )
        .required(),
    avatar: Joi.string(),
});

//*login
const loginSchema = Joi.object({
    email: Joi.string().email().min(8).max(255).required().trim(),
    password: Joi.string()
        .regex(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
            )
        )
        .required(),
});
const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().min(8).max(255).required().trim(),
});

//*validate register
const validateRegisterSchema = (userInput) => {
    return validate(registerSchema, userInput);
};
//*validate login
const validateLoginSchema = (userInput) => {
    return validate(loginSchema, userInput);
};
const validateForgotPasswordSchema = (userInput) => {
    return validate(forgotPasswordSchema, userInput);
};

module.exports = {
    validateRegisterSchema,
    validateLoginSchema,
    validateForgotPasswordSchema,
};