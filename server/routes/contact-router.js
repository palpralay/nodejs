const express = require("express");
const router = express.Router();
const { contactForm } = require("../controllers/contact-controller");
const validateBody = require("../middlewares/validate-middleware");
const { contactSchema } = require("../validators/contact-validator");
const authMiddleware = require("../middlewares/auth-middleware");

// Protect contact form route
router.use(authMiddleware);

router.route("/contact").post(validateBody(contactSchema), contactForm);

module.exports = router;