const Joi = require("joi");
const validate = require("./validate");

const newBizSchema = Joi.object({
    bizName: Joi.string().min(2).max(255).required().trim(),
    bizDescription: Joi.string().min(2).allow("").trim(),
    bizAddress: Joi.string().min(5).max(255).required().trim(),
    bizPhone: Joi.string()
        .min(2)
        .max(20)
        .regex(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/)
        .required(),
    bizImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
});
const newAnimalSchema = Joi.object({
    animalName: Joi.string().min(2).max(255).required().trim(),
    animalRace: Joi.string().min(2).max(255).required().trim(),
});

const updateBizSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
    bizName: Joi.string().min(2).max(255).allow("").trim(),
    bizDescription: Joi.string().allow("").trim(),
    bizAddress: Joi.string().min(5).max(255).allow("").trim(),
    bizPhone: Joi.string()
        .min(2)
        .max(20)
        .allow("")
        .regex(/^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/),
    bizImg: Joi.string()
        .regex(/^http(s?)\:\/\/(\.?)/)
        .allow(""),
});

const deleteBizSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

const findBizCardByIdSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

const validateNewBizSchema = (userInput) => {
    // return newBizSchema.validateAsync(userInput, { abortEarly: false });
    return validate(newBizSchema, userInput);
};
const validateNewAnimalSchema = (userInput) => {
    // return newBizSchema.validateAsync(userInput, { abortEarly: false });
    return validate(newAnimalSchema, userInput);
};

const validateUpdateBizSchema = (userInput) => {
    // return newBizSchema.validateAsync(userInput, { abortEarly: false });
    return validate(updateBizSchema, userInput);
};
const validateDeleteBizSchema = (userInput) => {
    // return newBizSchema.validateAsync(userInput, { abortEarly: false });
    return validate(deleteBizSchema, userInput);
};
const validateFindBizCardByIdSchema = (userInput) => {
    // return newBizSchema.validateAsync(userInput, { abortEarly: false });
    return validate(findBizCardByIdSchema, userInput);
};

module.exports = {
    newBizSchema,
    validateNewBizSchema,
    validateUpdateBizSchema,
    validateDeleteBizSchema,
    validateFindBizCardByIdSchema,
    validateNewAnimalSchema,
};