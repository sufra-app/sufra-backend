import createHttpError from "http-errors";
const checkRole = (...requiredRoles) => {
  return (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      throw createHttpError.Forbidden({
        message: "Access denied,  insufficient permissions.",
      });
    }
    next();
  };
};

export default checkRole;
