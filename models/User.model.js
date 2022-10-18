const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 4,
      max: 12,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      max: 12,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      max: 12,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    smoking: {
      type: String,
      enum: ["yes", "no"],
    },
    alcohol: {
      type: String,
      enum: ["yes", "no"],
    },
    birthdate: {
      type: Date,
    },
    profilepic: {
      type: Image,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
