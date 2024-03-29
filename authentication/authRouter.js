const express = require("express");
const passportConfig = require("./passportConfig");
const validateUser = require("./validateAndReturnUser");
const signTokenJWT = require("./signTokenJWT");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/facebook")
  .post(
    passportConfig.FacebookAuthentication,
    authController.validateUserAndSignJWT
  );
router
  .route("/google")
  .post(
    passportConfig.GoogleAuthentication,
    authController.validateUserAndSignJWT
  );
router
  .route("/secret")
  .get(passportConfig.optionalAuthentication, (req, res, next) => {
    res.status(200).json({
      status: "secret",

      user: req.user,
    });
  });

module.exports = router;
