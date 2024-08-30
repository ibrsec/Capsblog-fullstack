"use strict";

/* -------------------------------------------------------------------------- */
/*                               Category Model                               */
/* -------------------------------------------------------------------------- */

const {mongoose} = require('../configs/dbConnection');

const uniqueValidator = require("mongoose-unique-validator");



const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3,
        maxlength:15,
    }
},{
    collection:'categories',timestamps:true,
})

categorySchema.plugin(uniqueValidator, {
    message: "This {PATH} is exist!(500)",
  });

  
module.exports.Category = mongoose.model('Category', categorySchema)