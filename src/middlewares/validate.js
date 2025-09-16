export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // parse & validate request body
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      errors: err,
    });
  }
};
