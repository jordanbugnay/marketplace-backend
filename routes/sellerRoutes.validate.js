import Joi from '@hapi/joi';

const getSeller = queyString => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const id = queyString.id || parseInt(queyString.id);

  return schema.validate({ id });
};

export default {
  getSeller,
};
