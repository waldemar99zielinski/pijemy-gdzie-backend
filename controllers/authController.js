const validateAndReturnUser = require("../authentication/validateAndReturnUser");
const SignTokenJWT = require("../authentication/signTokenJWT");
const ErrorHandler = require("../Errors&Logs/errorHandler");

exports.validateUserAndSignJWT = async (req, res, next) => {
  try {
    if (req.user) {
      const id = req.user.id;
      const name = req.user.displayName;
      const email = req.user.emails[0].value;
      const provider = req.user.provider;

      const user = await validateAndReturnUser(provider, id, name, email);

      res.status(200).json({
        status: "Success",
        token: SignTokenJWT(user.id),
        user: user,
      });
    }
  } catch (error) {
    next(
      new ErrorHandler(
        "Error: authController: validateUserAndSignJWT: " + error.message,
        404
      )
    );
  }
};
