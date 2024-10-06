const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const router = express.Router();
const usersValidation = require("../Validations/userValidation");
const { validationResult } = require("express-validator");



router.post(
  "/register",
  usersValidation(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);
// Login user
router.post("/login", loginUser);

module.exports = router;
