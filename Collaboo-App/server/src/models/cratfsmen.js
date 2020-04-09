const mongoose = require("mongoose");
const validator = require("validator");
var Schema = mongoose.Schema;
var ClientSchema = new Schema(
    {
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
          unique: true,
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
          unique: true
        },
        role: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        company: {
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
      }
)
ClientSchema.index({email:1, mobile:1}, { unique: true });
const Craftsmen = mongoose.model("Craftsmen", ClientSchema);
module.exports = Craftsmen;