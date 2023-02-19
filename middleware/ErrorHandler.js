//Since middleware it'll always take a ** next() ** function

const AppError = require("../AppError");

const ErrorHandler = (error, req, res, next) => {
  // 1) ___________VALIDATION ERROR_____________________
  // => If validation error lets make sure we retyurn more details
  //    so that we can help clint bto navigate whats exacyly wrong!

  if (error.name === "ValidationError") {
    res.status(400).send({ Type: error.name, Details: error.details });
  }

  // 2) ______________AppError_________________________________
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }
  console.log("*************************");
  console.log(error);
  console.log("*************************");
  //3) _____Remanining categpry is generally the one which we dont know______
  //If error us found we shall ebe returning the error message
  return res.status(500).send("Something Went Wrong!!");
};

module.exports = ErrorHandler;
