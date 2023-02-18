//Since middleware it'll always take a ** next() ** function

const ErrorHandler = (error, req, res, next) => {
  

  // => If validation error lets make sure we retyurn more details
  //    so that we can help clint bto navigate whats exacyly wrong!

  if (error.name === "ValidationError") {
    res.status(400).send({ Type: error.name, Details: error.details });
  }
  console.log("*************************");
  console.log(error);
  console.log("*************************");
 //If error us found we shall ebe returning the error message
  return res.status(400).send(error.message);
};

module.exports = ErrorHandler;
