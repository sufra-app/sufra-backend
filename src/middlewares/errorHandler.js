import createHttpError from "http-errors";

const errorHandler = (err, req, res, next) => {
  if (createHttpError.isHttpError(err)) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
};

export default errorHandler;
