"use strict";

/* -------------------------------------------------------------------------- */
/*                               Category Model                               */
/* -------------------------------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection"); 
const { urlValidation } = require("../helpers/utils");
// const uniqueValidator = require("mongoose-unique-validator");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      required: true, 
      maxlength: 800,
    },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

// blogSchema.plugin(uniqueValidator, {
//   message: "This {PATH} is exist!(500)",
// });

module.exports.Comment = mongoose.model("Comment", commentSchema);
