import { validationResult } from 'express-validator';

export const validateMiddleware = (viewName) => {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Pass the first error message to the view
      return res.render(viewName, {
        message: errors.array()[0].msg,
      });
    }

    next(); // No validation errors, continue to controller
  };
};
