"use strict";

const jwt = require("jsonwebtoken");
const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError");
const passwordEncryptor = require("../helpers/passwordEncryptor");
const { Token } = require("../models/tokenModel");
const { User } = require("../models/userModel");
const {
  mustRequirementOr400,
  idTypeValidationOr400,
  isExistOnTableOr404,
  partialRequirementOr400,
} = require("../helpers/utils");

module.exports.user = {
  list: async function (req, res) {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                List all users!</br></br>
                <b>Permission= Loginned user</b></br> 
                - Normal users can't list other users</br>
                - Admin users can list everyone</br></br>
                Token endpoint is hidden </br></br>
                You can send query with endpoint for filter[],search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `



        */

    //restrict listing user to non admin users = they wont see the admins

    let customFilters = { _id: req.user._id };
    if (req.user?.isAdmin) {
      customFilters = {};
    }

    const users = await res.getModelList(User, customFilters);
    res.status(200).json({
      error: false,
      message: "Users are listed!",
      details: await res.getModelListDetails(User, customFilters),
      data: users,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create new User"
            #swagger.description = `
                create a new user!</br></br>
                <b>Permission= No Permission</b></br> 
                - Admin or in-active users can be create.d just by admin users</br></br>
                - Password type Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]</br>
                - Email type Rules- --@--.--</br>
                - Required fields: - username, email, password, firstName, lastName, gender</br>
                 - if user sends a image with file upload it returns, else a random pic returns</br>
                 - File uploads with multipart form data</br>

            `

            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
              description: 'Upload profile image!',
            }


            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $username : 'testuser',
                    $email : 'testuser@email.com',
                    $password : 'Password1*',
                    $firstName : 'firstname',
                    $lastName : 'lastname',
                    $gender :'male',
                    isActive : true,
                    isAdmin : false, 

                }
            }
            #swagger.responses[201] = {
            description: 'Successfully created!',
            schema: { 
                error: false,
                message: "A new user is created!!",
                token:"tokenkey",
                bearer:{
                  accessToken:"accestoken key",
                  refreshToken:"refreshtoken key",
                },
                data:{$ref: '#/definitions/User'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request - username,email,password, firstName, gender lastName fields are required!`
            }



        */

    const { username, email, password, firstName, lastName, gender } = req.body;

    mustRequirementOr400({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
    });
    // if (!username || !email || !password || !firstName || !lastName || !gender) {
    //   throw new CustomError(
    //     "username, email, password, firstName, lastName, gender fields are required!",
    //     400
    //   );
    // }

    if (!req?.user?.isAdmin) {
      //if user is not a admin user!
      req.body.isAdmin = false;
      req.body.isActive = true;
    }

    if (req?.file) {
      req.body.image =
        process.env.IMAGE_HOST + "/api/uploads/" + req.file.filename;
    } else {
      req.body.gender === "male"
        ? (req.body.image = `https://avatar.iran.liara.run/public/boy?username=${username}`)
        : (req.body.image = `https://avatar.iran.liara.run/public/girl?username=${username}`);
    }

    const newUser = await User.create(req.body);

    /* AUTO LOGIN */
    // SimpleToken:
    const tokenData = await Token.create({
      userId: newUser._id,
      token: passwordEncryptor(newUser._id + Date.now()),
    });
    // JWT:
    const accessToken = jwt.sign(newUser.toJSON(), process.env.ACCESS_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(
      { username: newUser?.username, password: newUser?.password },
      process.env.REFRESH_KEY,
      { expiresIn: "3d" }
    );
    /* AUTO LOGIN */

    delete req.body.createdAt;
    delete req.body.updatedAt;

    res.status(201).json({
      error: false,
      message: "A new user is created!",
      token: tokenData.token,
      bearer: { accessToken, refreshToken },
      data: newUser,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get a user"
            #swagger.description = `
                Get a user by id!!</br></br>
                <b>Permission= Loginned user</b></br> 
                - Admin can list all users!</br> 
                - Normal user can list just theirselves!</br></br> 
            
            #swagger.responses[200] = {
            description: 'Successfully found!',
            schema: { 
                error: false,
                message: "User is found!",
                data:{$ref: '#/definitions/User'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request - Invalid userId (paramId) type(ObjectId)!`
            }
            #swagger.responses[404] = {
            description:`Not found - User not found!`
            }



        */

    idTypeValidationOr400(
      req.params.id,
      "Invalid userId (paramId) type(ObjectId)!"
    );

    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError("Invalid id type(ObjectId)!", 400);
    // }

    if (!req.user?.isAdmin) {
      req.params.id = req.user._id;
    }

    const user = await isExistOnTableOr404(
      User,
      { _id: req.params.id },
      "User not found!"
    );
    // const user = await User.findOne({ _id: req.params.id });

    // if (!user) {
    //   throw new CustomError("User not found!", 404);
    // }

    res.status(200).json({
      error: false,
      message: "User is found!",
      data: user,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update a User"
            #swagger.description = `
                Update a User by id!</br></br>
                <b>Permission= Normal user</b></br> 
                - Admin users can be update.d just by admin users</br> 
                - Other users can update theirselves</br>
                - Admin or active modifications are accessible for just the admin users!</br> </br>
                - Password type Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]</br>
                - Email type Rules- --@--.--</br>
                - Required fields: - username, email, password, firstName, lastName, gender</br>
                 - if user try to update user image with file upload, it returns </br>
                 - if user changes the gender without uploading a file image, then avatar changes to correct gender automaticly!</br>
                 - File uploads with multipart form data</br>

            `


            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
              description: 'Upload profile image!',
            }


            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $username : 'testuser',
                    $email : 'testuser@email.com',
                    $password : 'Password1*',
                    $firstName : 'firstname',
                    $lastName : 'lastname',
                    $gender : 'male',
                    isActive : true,
                    isAdmin : false, 

                }
            }
            #swagger.responses[202] = {
            description: 'Successfully updated!',
            schema: { 
                error: false,
                message: "User is updated!!",
                data:{modifiedCount:1},
                new:{$ref: '#/definitions/User'} 
            }

        }  

            #swagger.responses[400] = {
                description:`Bad request 
                    </br>- Invalid userId(paramId) type(ObjectId)!
                    </br>- username, email, password, firstName, lastName, gender fields are required!
                    </br>- Non-admin users can't modify other users!
                    `
            }
            #swagger.responses[404] = {
                description:`Not found - User not found for update!`
            }
            #swagger.responses[500] = {
                description:`Something went wrong! - asked record is found, but it couldn't be updated!`
            }



        */

    idTypeValidationOr400(
      req.params.id,
      "Invalid userId(paramId) type(ObjectId)!"
    );
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError("Invalid id type(ObjectId)!", 400);
    // }

    const { username, email, password, firstName, lastName, gender } = req.body;

    mustRequirementOr400({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
    });
    // if (!username || !email || !password || !firstName || !lastName || !gender) {
    //   throw new CustomError(
    //     "username,email,password, firstName, lastName, gender fields are required!",
    //     400
    //   );
    // }

    const user = await isExistOnTableOr404(
      User,
      { _id: req.params.id },
      "User not found for update!"
    );
    // const user = await User.findOne({ _id: req.params.id });
    // if (!user) {
    //   throw new CustomError("User not found", 404);
    // }

    //admin restrictions
    if (!req?.user?.isAdmin) {
      if (req.user?._id != req.params.id) {
        throw new CustomError("Non-admin users can't modify other users!", 400);
      }
    }

    //admin or active modifications are accessible for just the admin users!
    if (!req?.user?.isAdmin) {
      //if user is not a admin user!
      req.body.isAdmin = user?.isAdmin;
      req.body.isActive = user?.isActive;
    }

    if (req?.file) {
      req.body.image =
        process.env.IMAGE_HOST + "/api/uploads/" + req.file.filename;
    } else {
      delete req.body.image;
      if (req?.body?.gender) {
        req.body.gender === "male"
          ? (req.body.image = `https://avatar.iran.liara.run/public/boy?username=${username}`)
          : (req.body.image = `https://avatar.iran.liara.run/public/girl?username=${username}`);
      }
    }

    delete req.body.createdAt;
    delete req.body.updatedAt;

    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    if (data?.modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - asked record is found, but it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "User is updated!",
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },
  partialUpdate: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Partial Update"
            #swagger.description = `
                Partial Update a User by id!</br></br>
                <b>Permission= Normal user</b></br> 
                - Admin users can be update.d just by admin users</br>
                - Other users can update just theirselves</br>
                - Admin or active modifications are accessible for just the admin users!</br> </br>
                - Password type Rules- [lenght:8-16, at least: 1 upper, 1 lower, 1 number, 1 special[@$!%*?&]]</br>
                - Email type Rules- --@--.--</br>
                - Required fields: - At least one of the username, email, password, firstName, lastName, gender, isActive, isAdmin fields is required!</br>
                 - if user try to update user image with file upload, it returns </br>
                 - if user changes the gender without uploading a file image, then avatar changes to correct gender automaticly!</br>
                 - File uploads with multipart form data</br>
            `


            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
              description: 'Upload profile image!',
            }

            
            #swagger.parameters['body']={
                in:'body',
                description:'One field is enough!',
                required:true,
                schema:{
                    username : 'testuser',
                    email : 'testuser@email.com',
                    password : 'Password1*',
                    firstName : 'firstname',
                    lastName : 'lastname',
                    gender : 'male',
                    isActive : true,
                    isAdmin : false, 

                }
            }
            #swagger.responses[202] = {
            description: 'Successfully partially updated!',
            schema: { 
                error: false,
                message: "User is partially updated!!",
                data:{modifiedCount:1},
                new:{$ref: '#/definitions/User'} 
            }

        }  

            #swagger.responses[400] = {
                description:`Bad request 
                    </br>- Invalid userId(paramId) type(ObjectId)!
                    </br>- At least one field of username, email, password, firstName, lastName, gender, isActive, isAdmin fields is required!
                    </br>- Non-admin users can't modify other users!
                    
                    `
            }
            #swagger.responses[404] = {
                description:`Not found - User not found for partial update!`
            }
            #swagger.responses[500] = {
                description:`Something went wrong! - asked record is found, but it couldn't be updated!`
            }



        */

    idTypeValidationOr400(
      req.params.id,
      "Invalid userId(paramId) type(ObjectId)!"
    );
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError("Invalid id type(ObjectId)!", 400);
    // }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
      isActive,
      isAdmin,
    } = req.body;

    partialRequirementOr400({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
      isActive,
      isAdmin,
    });
    // if (
    //   !(
    //     username ||
    //     email ||
    //     password ||
    //     firstName ||
    //     lastName ||
    //     isActive ||
    //     isAdmin ||
    //     gender
    //   )
    // ) {
    //   throw new CustomError(
    //     "At least one field of username, email, password, firstName, lastName, gender, isActive, isAdmin fields is required!",
    //     400
    //   );
    // }

    const user = await isExistOnTableOr404(User, {_id:req.params.id}, "User not found for partial update!" )
    // const user = await User.findOne({ _id: req.params.id });
    // if (!user) {
    //   throw new CustomError("User not found", 404);
    // }

    //admin restrictions
    /*-----------------*/
    if (!req?.user?.isAdmin) {
      if (req.user?._id != req.params.id) {
        throw new CustomError("Non-admin users can't modify other users!", 400);
      }
    }

    //admin or active modifications are accessible for just the admin users!
    if (!req?.user?.isAdmin) {
      //if user is not a admin user!
      req.body.isAdmin = user?.isAdmin; 
      req.body.isActive = user?.isActive;
    }

    if (req?.file) {
      req.body.image =
        process.env.IMAGE_HOST + "/api/uploads/" + req.file.filename;
    } else {
      delete req.body.image;
      if (req?.body?.gender) {
        req.body.gender === "male"
          ? (req.body.image = `https://avatar.iran.liara.run/public/boy?username=${username}`)
          : (req.body.image = `https://avatar.iran.liara.run/public/girl?username=${username}`);
      }
    }

    delete req.body.createdAt;
    delete req.body.updatedAt;

    const { modifiedCount } = await User.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );

    if (modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - asked record is found, but it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "User is partially updated!",
      result: await User.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete a user"
            #swagger.description = `
                Delete a user by id!!</br></br>
                <b>Permission= Admin user</b></br> 
                - Admin can delete all users!</br>
                - Other users can't delete any user!</br> 
            
            #swagger.responses[204] = {
            description: 'Successfully deleted!'

        }  
            #swagger.responses[400] = {
            description:`Bad request - Invalid userId(paramId) type(ObjectId)!`
            }
            #swagger.responses[404] = {
            description:`Not found - User not found fro delete!`
            }

            #swagger.responses[500] = {
                description:`Something went wrong! - asked record is found, but it couldn't be updated!`
            }

        */

    idTypeValidationOr400(req.params.id, "Invalid userId(paramId) type(ObjectId)!");
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError("Invalid id type(ObjectId)!", 400);
    // }

    const user = await isExistOnTableOr404(User, {_id: req.params.id}, "User not found for delete!")
    // const user = await User.findOne({ _id: req.params.id });

    // if (!user) {
    //   throw new CustomError("User not found!", 404);
    // }

    const { deletedCount } = await User.deleteOne({ _id: req.params.id });
    if (deletedCount < 1) {
      throw new CustomError(
        "Something went wrong! - asked record is found, but it couldn't be deleted!",
        500
      );
    }
    res.sendStatus(204);
  },
};
