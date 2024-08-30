"use strict";

/* -------------------------------------------------------------------------- */
/*                               Category Model                               */
/* -------------------------------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection"); 
const { urlValidation } = require("../helpers/utils");
// const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 50000,
    },
    image: {
      type: String,
      trim: true,
      required: true, 
      maxlength: 1000,
      validation: (image)=> urlValidation(image),
    },
    isPublish: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    countOfVisitors:{
      type: Number,
      default: 0,
    }
  },
  {
    collection: "blogs",
    timestamps: true,
  }
);

// blogSchema.plugin(uniqueValidator, {
//   message: "This {PATH} is exist!(500)",
// });

module.exports.Blog = mongoose.model("Blog", blogSchema);
