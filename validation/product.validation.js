const Joi = require("joi");
const validate = require("./validate");

const newProductSchema = Joi.object({
    productName: Joi.string().min(2).max(255).required().trim(),
    productPrice: Joi.string().min(1).max(255).required().trim(),
    productStock: Joi.string().min(1).max(255).required().trim(),
});

const updateProductSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
    productName: Joi.string().min(2).max(255).allow("").trim(),
    productPrice: Joi.string().min(1).max(255).allow("").trim(),
    productStock: Joi.string().min(1).max(255).allow("").trim(),
});

const deleteProductSchema = Joi.object({
    id: Joi.string().length(24).hex().required().trim(),
});

const validateNewProductSchema = (userInput) => {
    return validate(newProductSchema, userInput);
};

const validateUpdateProductSchema = (userInput) => {
    return validate(updateProductSchema, userInput);
};

const validateDeleteProductSchema = (userInput) => {
    return validate(deleteProductSchema, userInput);
};

module.exports = {
    validateNewProductSchema,
    validateUpdateProductSchema,
    validateDeleteProductSchema,
};