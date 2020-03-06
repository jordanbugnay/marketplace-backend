import Joi from "@hapi/joi";

const postUser = body => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required()
  });

  return schema.validate(body);
};

export default {
  postUser
};
