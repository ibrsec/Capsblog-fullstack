"use strict";

const CustomError = require("../errors/customError");
const sendMail = require("../helpers/sendMail");
const {
  idTypeValidationOr400,
  isExistOnTableOr404,
  mustRequirementOr400,
  lengthValidationOr400,
  isUniqueOnTableOr409,
  capitalize,
} = require("../helpers/utils");
const { Category } = require("../models/categoryModel");
/* -------------------------------------------------------------------------- */
/*                             Email Controller                            */
/* -------------------------------------------------------------------------- */

const { Email } = require("../models/emailModel");

module.exports.email = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Emails"]
            #swagger.summary = "List Emails"
            #swagger.description = `
                List all Emails!</br></br>
                <b>Permission= No Permission</b></br>   
                You can send query with endpoint for filter[],search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `

            #swagger.responses[200] = {
            description: 'Successfully Listed!',
                schema: { 
                    error: false,
                    message: "Emails are listed!",
                    data:{$ref: '#/definitions/Email'} 
                }
            }


        */
    const emails = await res.getModelList(Email, {}, "categoryId");
    res.json({
      error: false,
      message: `Emails are listed!`,
      details: await res.getModelListDetails(Email),
      data: emails,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Emails"]
            #swagger.summary = "Get a Email"
            #swagger.description = `
                Get a Email by email id(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br>  
            `
            #swagger.responses[200] = {
            description: 'Successfully Found!',
                schema: { 
                    error: false,
                    message: "Email is found!",
                    data:{$ref: '#/definitions/Email'} 
                }
            }

            #swagger.responses[400] = {
            description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
            }

            #swagger.responses[404] = {
            description:`Not found - Email not found!`
            }

        */

    //id check if it is objectId
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)"
    );
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError(
    //     "Invalid param Id type! (it Should be ObjectId)",
    //     400
    //   );
    // }

    const email = await isExistOnTableOr404(
      Email,
      { _id: req.params.id },
      "Email not found!"
    );
    // const email = await Email.findOne({ _id: req.params.id });

    // if (!email) {
    //   throw new CustomError("Email not found!", 404);
    // }

    res.json({
      error: false,
      message: `Email is found!`,
      data: email,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Emails"]
            #swagger.summary = "Create Email"
            #swagger.description = `
                Create a Email!</br></br>
                <b>Permission= Admin user</b></br></br>
                - Email field max length: 50</br>  
                - Email name must be unique</br> 
            `

            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $email : 'test email name',
                    $categroyId : '66ccd20f801a1bb658076c39'
                }
            }
            #swagger.responses[201] = {
            description: 'Successfully created!',
            schema: { 
                error: false,
                message: "A new email is created!",
                data:{$ref: '#/definitions/Email'} 
            }

        }   


            #swagger.responses[400] = {
            description:`Bad request - email field is required!</br> 
                         - Invalid categoryId type(it should be a objectId)!</br> 
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found - Category not found on categories</br>  
            
            `
            }
            #swagger.responses[409] = {
            description:`Conflict - This email is already exist!</br>
            
            `
            }


        */

    // * Checks if a requirement is mandatory based on the provided name in the request body.
    mustRequirementOr400({
      email: req.body.email,
      categoryId: req.body.categoryId,
    });
    // if (!req.body.name) {
    //   throw new CustomError("name field is required!", 400);
    // }

    const { email, categoryId } = req.body;

    //length check
    lengthValidationOr400(email, "email", 1, 50);

    //categroy checks
    idTypeValidationOr400(
      categoryId,
      "Invalid categoryId type(it should be a objectId)!"
    );

    const category = await isExistOnTableOr404(
      Category,
      { _id: categoryId },
      "Category not found on categories!"
    );

    //unique check

    await isUniqueOnTableOr409(
      Email,
      { email },
      "This email is already exist!"
    );

    // const existEmail = await Email.findOne({ name: name });
    // if (existEmail) {
    //   throw new CustomError("This email is already exist!", 409);
    // }

    delete req.body.createdAt;
    delete req.body.updatedAt;

    const newEmail = await Email.create(req.body); //create new email

    res.status(201).json({
      error: false,
      message: "A new email is created!",
      data: newEmail,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Emails"]
            #swagger.summary = "UPDATE Email"
            #swagger.description = `
                Update a Email with id(ObjectId)!</br></br>
                <b>Permission= Admin user</b></br></br>
                - Email field max length: 15</br>  
                - Email field must be unique</br> 
            `

            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $email : 'test email name',
                    $categroyId : '66ccd20f801a1bb658076c39'
                }
            }
            #swagger.responses[202] = {
            description: 'Successfully updated!',
            schema: { 
                error: false,
                message: "Email is updated!",
                data:{$ref: '#/definitions/Email'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request: </br>
            - email field is required!</br>
            - Invalid param Id type! (it Should be ObjectId)!</br> 
            description:`Bad request - Invalid categoryId type(it should be a objectId)!</br> 
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - Email not found for update!</br> 
            - Category not found on categories</br>  
            
            `
            }
            #swagger.responses[409] = {
            description:`Conflict: </br>
            - This email is already exist!</br> 
            
            `
            }
            #swagger.responses[500] = {
            description:`Something went wrong! - Email is found! But it couldn't be updated!`
            }




        */

    //id type validation
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)!"
    );
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError(
    //     "Invalid param Id type! (it Should be ObjectId)",
    //     400
    //   );
    // }

    mustRequirementOr400({
      email: req.body.email,
      categoryId: req.body.categoryId,
    });
    // if (!req.body?.name) {
    //   throw new CustomError("name field is required!", 400);
    // }

    //desturuct name
    const { email, categoryId } = req.body;

    //length check and error
    lengthValidationOr400(email, "email", 3, 15);
    // if (name.length < 3 || name.length > 50) {
    //   throw new CustomError(
    //     "Email name length should be between 3 to 50!",
    //     400
    //   );
    // }

    idTypeValidationOr400(
      categoryId,
      "Invalid categoryId type(it should be a objectId)!"
    );

    const category = await isExistOnTableOr404(
      Category,
      { _id: categoryId },
      "Category not found on categories!"
    );

    await isExistOnTableOr404(
      Email,
      { _id: req.params.id },
      "Email not found for update!"
    );
    // const email = await Email.findOne({ _id: req.params.id });

    // if (!email) {
    //   throw new CustomError("Email not found for update!", 404);
    // }

    //unique check
    await isUniqueOnTableOr409(
      Email,
      { email },
      "This email is already exist!"
    );
    // const existEmail = await Email.findOne({ name: name });
    // if (existEmail) {
    //   throw new CustomError("This email is already exist!", 409);
    // }

    delete req.body.createdAt;
    delete req.body.updatedAt;

    const { modifiedCount } = await Email.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Email is found! But it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Email is updated!",
      data: await Email.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
  #swagger.tags = ["Emails"]
  #swagger.summary = "Delete a Email"
  #swagger.description = `
      Delete a Email by email id(ObjectId)!</br></br>
      <b>Permission= Admin user</b></br>  
  `
  #swagger.responses[200] = {
  description: 'Successfully Deleted!',
      schema: { 
          error: false,
          message: "Email is deleted!",
          data:{$ref: '#/definitions/Email'} 
      }
  }

  #swagger.responses[400] = {
  description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
  }

  #swagger.responses[404] = {
  description:`Not found - Email not found for deletion!`
  }
  #swagger.responses[500] = {
  description:`Something went wrong! - Email is found! But it couldn't be deleted!`
  }

*/

    //id check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)"
    );
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError(
    //     "Invalid param Id type! (it Should be ObjectId)",
    //     400
    //   );
    // }

    await isExistOnTableOr404(
      Email,
      { _id: req.params.id },
      "Email not found for deletion!"
    );
    // const email = await Email.findOne({ _id: req.params.id });

    // if (!email) {
    //   throw new CustomError("Email not found for deletion!", 404);
    // }

    const { deletedCount } = await Email.deleteOne({ _id: req.params.id });
    if (deletedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Email is found! But it couldn't be deleted!",
        500
      );
    }

    res.sendStatus(204);
  },
  subscribe: async (req, res) => {
    /*
            #swagger.ignore = true

        */

    // * Checks if a requirement is mandatory based on the provided name in the request body.
    mustRequirementOr400({
      email: req.body.email,
      categoryId: req.body.categoryId,
    });
    // if (!req.body.name) {
    //   throw new CustomError("name field is required!", 400);
    // }

    const { email, categoryId } = req.body;

    //length check
    lengthValidationOr400(email, "email", 1, 50);

    //categroy checks
    idTypeValidationOr400(
      categoryId,
      "Invalid categoryId type(it should be a objectId)!"
    );
    const category = await isExistOnTableOr404(
      Category,
      { _id: categoryId },
      "Category not found on categories!"
    );

    //unique check

    // const emailData = await isUniqueOnTableOr409(Email, { email }, "You already subscribed!");

    const emailData = await Email.findOne({ email, categoryId });
    if (emailData) {
      throw new CustomError(
        `You already subscribed for ${category?.name} category!`,
        409
      );
    }

    delete req.body.createdAt;
    delete req.body.updatedAt;

    const newEmail = await Email.create(req.body); //create new email

    sendMail(
      newEmail?.email,
      "CapsBlog - Welcome to Our Newsletter!",
      `
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <div style="background-color: #80874C; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Welcome to Our Newsletter!</h1>
      </div>
      <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0;">Hi,</p>
          <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0;">Welcome! We're excited to have you join our newsletter community. 🎉</p>
          <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0;">You'll be the first to hear about our latest ${category?.name} blogs!</p>
          <a href="${process.env.IMAGE_HOST}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #80874C; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
      </div>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777777;">
          <p style="margin: 0;">If you have any questions or feedback, feel free to reach out.</p>
          <p style="margin: 0;">If you want to delete your subscription: </p>
          <a href="${process.env.IMAGE_HOST}/api/emails/subscription/${newEmail?._id}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #80874C; 
          color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;"> Remove subscription</a>
          <p style="margin: 0;">Thank you for subscribing!</p>
          <p style="margin: 0;">Best regards,<br>Caps Blog</p>
      </div>
  </div>
      `
    );

    res.status(201).json({
      error: false,
      message: `Welcome - we have added your email to our news letter for ${category?.name} category!`,
      data: newEmail,
    });
  },
  deleteSubscribe: async (req, res) => {
    /*
  #swagger.ignore = true

*/

    //id check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)"
    );
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError(
    //     "Invalid param Id type! (it Should be ObjectId)",
    //     400
    //   );
    // }

    await isExistOnTableOr404(
      Email,
      { _id: req.params.id },
      "Email not found for deletion!"
    );
    // const email = await Email.findOne({ _id: req.params.id });

    // if (!email) {
    //   throw new CustomError("Email not found for deletion!", 404);
    // }

    const { deletedCount } = await Email.deleteOne({ _id: req.params.id });
    if (deletedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Email is found! But it couldn't be deleted!",
        500
      );
    }

    res.send(`
      <p>Your Subscribtion is removed! Thank you best regards!</p>
    `);
  },
};
