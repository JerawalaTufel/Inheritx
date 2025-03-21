const Joi = require("joi");

module.exports = {
    valiRegister : (req) => {
        const userRegisterShema = Joi.object({
            first_name : Joi.string().required(),
            last_name :  Joi.string().required(),
            mobile_number : Joi.string().required(),
            email : Joi.string().email().required(),
            password : Joi.string().required()
        })
        const { error } = userRegisterShema.validate(req);
        if(error) {
             return { status: 400, message: error.details[0].message };
        }
        return { status: 200};
    },
    valiLogin : (req) => {
        const loginShema = Joi.object({
            email : Joi.string().email().required(),
            password : Joi.string().required()
        })
        const { error } = loginShema.validate(req);
        if(error) {
             return { status: 400, message: error.details[0].message };

        }
        return { status: 200};
    },

}