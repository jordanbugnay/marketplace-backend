import Joi from "@hapi/joi";

const postCart = body => {
  const schema = Joi.object({
    id: Joi.number().required(),
    productId: Joi.number().required(),
    quantity: Joi.number()
      .min(1)
      .required()
  });

  return schema.validate(body);
};

export default {
  postCart
};
