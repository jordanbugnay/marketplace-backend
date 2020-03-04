import Joi from '@hapi/joi';

const getProduct = queryString => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return schema.validate(queryString);
};

const postProduct = body => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    sellerId: Joi.number().required(),
  });

  return schema.validate(body);
};

const putProduct = body => {
  const schema = Joi.object({
    id: Joi.number().required(),
    opts: Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      quantity: Joi.number(),
      price: Joi.number(),
    }).required(),
  });
  return schema.validate(body);
};

const deleteProduct = body => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return schema.validate(body);
};

export default {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
