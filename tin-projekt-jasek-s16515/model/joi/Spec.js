const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "number.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "number.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const specSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
    ,
    name: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages)
    ,
    minSalary: Joi.number()
        .min(4)
        .max(8)
        .required()
        .error(errMessages)

});

module.exports = specSchema;