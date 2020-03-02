export default {
  duplicateResource: opts => ({
    error: 'Duplicate resource',
    code: 409,
    ...opts,
  }),
  unprocessableEntity: opts => ({
    error: 'Unprocessable entity',
    code: 422,
    ...opts,
  }),
  badRequest: opts => ({
    error: 'Bad Request',
    code: 400,
    ...opts,
  }),
  notFound: opts => ({
    error: 'Not Found',
    code: 404,
    ...opts,
  }),
};
