import Joi from "@hapi/joi";

const getReportsProductCartCount = queryString => {
  const schema = Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date()
  });

  return schema.validate(queryString);
};

export default { getReportsProductCartCount };
