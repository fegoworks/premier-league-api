const Joi = require('@hapi/joi');

const validator = {
  validateBody: schema => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res
        .json({
          status: 400,
          error: result.error.message,
        })
        .status(400);
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      firstName: Joi.string()
        .regex(/^[a-zA-Z]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('First Name is required')),
      lastName: Joi.string()
        .regex(/^[a-zA-Z\\-]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('Last Name is required')),
      email: Joi.string()
        .email()
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
      isAdmin: Joi.string()
        .required()
        .trim()
        .lowercase()
        .valid('true', 'false')
        .error(new Error('Value must either be true or false')),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string()
        .regex(/\S+@\S+\.\S+/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
    }),
    createTeamSchema: Joi.object().keys({
      teamName: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error('A team name is required')),
    }),
    createFixtureSchema: Joi.object().keys({
      matchDate: Joi.date()
        .required(),
      homeTeam: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error('Home team is required')),
      awayTeam: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error('Away team is required')),
    }),
    updateScoresSchema: Joi.object().keys({
      homeTeamScore: Joi.number()
        .required()
        .error(new Error('Home score is required')),
      awayTeamScore: Joi.number()
        .required()
        .error(new Error('Away score is required')),
    }),
  },
};

export default validator;