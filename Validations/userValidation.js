const { body } = require("express-validator");
const userModel = require("../models/User");

const usersValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    // Email validation: not empty, valid format, and unique
    body("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Please include a valid email")
      .custom(async (value) => {
        const user = await userModel.findOne({ email: value });
        if (user) {
          throw new Error("Email already exists");
        }
        return true;
      }),

    // Password validation: not empty and minimum 6 characters
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    // Phone validation: optional, but if provided, must match a phone number pattern
    body("phone")
      .notEmpty()
      .withMessage("Phone cannot be empty")
      .matches(/^\+?\d{10,15}$/)
      .withMessage("Please enter a valid phone number (10-15 digits)"),
  ];
};

module.exports = usersValidation;
