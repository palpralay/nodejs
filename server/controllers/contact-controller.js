// |--------------------------------------------------|
// |              Contact controller                  |
// |--------------------------------------------------|


const Contact = require("../models/contact-model");

const contactForm = async (req, res, next) => {
  try {
    const response = req.body;
    await Contact.create(response);
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    next(error);
  }
};

module.exports = {
  contactForm,
};
