const Joi = require("joi");
const validate = require("./validate");

const updateAnimalSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
    animalName: Joi.string().min(2).max(255).required().trim(),
    animalRace: Joi.string().min(2).max(255).required().trim(),
});

const deleteAnimalSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

//* register
const animalRegisterSchema = Joi.object({
    name: Joi.string().min(2).max(255).required().trim(),
    email: Joi.string().email().min(2).max(255).required().trim(),
    race: Joi.string().min(2).max(255).required().trim(),
    password: Joi.string()
        .regex(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
            )
        )
        .required(),
});

//*login
const loginAnimalSchema = Joi.object({
    email: Joi.string().email().min(2).max(255).required().trim(),
    race: Joi.string().min(2).max(255).required().trim(),
    password: Joi.string()
        .regex(
            new RegExp(
                "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
            )
        )
        .required(),
});

const validateUpdateAnimalSchema = (userInput) => {
    // return newBizSchema.validateAsync(userInput, { abortEarly: false });
    return validate(updateAnimalSchema, userInput);
};
const validateDeleteAnimalSchema = (userInput) => {
    // return newBizSchema.validateAsync(userInput, { abortEarly: false });
    return validate(deleteAnimalSchema, userInput);
};

//*validate register
const validateAnimalRegisterSchema = (userInput) => {
    return validate(animalRegisterSchema, userInput);
};

//*validate login
const validateAnimalLoginSchema = (userInput) => {
    return validate(loginAnimalSchema, userInput);
};

module.exports = {
    validateUpdateAnimalSchema,
    validateDeleteAnimalSchema,
    validateAnimalRegisterSchema,
    validateAnimalLoginSchema,
};