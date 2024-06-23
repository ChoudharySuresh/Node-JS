const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  // Hash the password only if it has been modified (or it it new)

  if (!person.isModified("password")) return next();

  try {
    // Hash password generation
    const salt = await bycrypt.genSalt(10);

    // hash password
    const hashedPassword = await bycrypt.hash(person.password, salt);

    // override the plain password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bycrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
// Create Person Model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
