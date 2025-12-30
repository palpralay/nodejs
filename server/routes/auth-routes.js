const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validateBody = require("../middlewares/validate-middleware");
const { signupSchema } = require("../validators/auth-validators");
const { loginSchema } = require("../validators/login-validator");
const authMiddleware = require("../middlewares/auth-middleware"); 

router.route("/").get(authControllers.home);
router.route("/user").get(authMiddleware, authControllers.user);
router.route("/register").post(validateBody(signupSchema), authControllers.register);
router.route("/login").post(validateBody(loginSchema), authControllers.login);

module.exports = router;