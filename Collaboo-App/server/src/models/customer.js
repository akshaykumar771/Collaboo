const mongoose = require('mongoose');
const validator = require('validator');

const Customer = mongoose.model("Customer", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  address: {
    type: String,
    trim: true,
  },
  postalcode: {
    type: Number,
    trim: true,
    minlength: 5,
  },
  city: {
    type: String,
    trim: true,
  },

  mobile: {
    type: String,
    required: true,
    
  },
  role:{
      type: String,
      required: true,
 },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot be password");
      }
    },
  },
});

module.exports = Customer;
