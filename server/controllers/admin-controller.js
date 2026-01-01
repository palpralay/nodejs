const User = require("../models/user-model");
const Contact = require("../models/contact-model");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};


//get all contacts
const getAllcontact = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts) {
      return res.status(404).json({ message: "No contacts found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllcontact };