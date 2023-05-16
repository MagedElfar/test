import Joi from "joi";


const addProductSchema = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    costPrice: Joi.number().required(),
    salePrice: Joi.number().optional(),
    description: Joi.string().optional(),
    category: Joi.number().optional(),
    image: Joi.string().optional()
})


export {
    addProductSchema
}