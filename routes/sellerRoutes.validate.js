import Joi from '@hapi/joi';

const getSeller = queryString => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return schema.validate(queryString);
};

const postSeller = body => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
  });

  return schema.validate(body);
};

const putSeller = body => {
  const schema = Joi.object({
    id: Joi.number().required(),
    opts: Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
    }).required(),
  });
  return schema.validate(body);
};

const deleteSeller = body => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return schema.validate(body);
};

export default {
  getSeller,
  postSeller,
  putSeller,
  deleteSeller,
};
