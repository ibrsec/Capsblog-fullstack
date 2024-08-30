"use strict";

const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError");
const {
  idTypeValidationOr400,
  mustRequirementOr400,
  isExistOnTableOr404,
  urlValidation,
  partialRequirementOr400,
  lengthValidationOr400,
} = require("../helpers/utils");
/* -------------------------------------------------------------------------- */
/*                             Blog Controller                            */
/* -------------------------------------------------------------------------- */

const { Blog } = require("../models/blogModel");
const { Category } = require("../models/categoryModel");
const { User } = require("../models/userModel");

module.exports.blog = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "List Blogs"
            #swagger.description = `
                List all Blogs!</br></br>
                <b>Permission= Loginned user</b></br>   
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
                    message: "Blogs are listed!",
                    data:{$ref: '#/definitions/Blog'} 
                }
            }


        */
    const blogs = await res.getModelList(Blog, {}, [
      { path: "userId", select: "username image" },
      { path: "categoryId", select: "name" },
    ]);

    res.json({
      error: false,
      message: `Blogs are listed!`,
      details: await res.getModelListDetails(Blog),
      data: blogs,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get a Blog"
            #swagger.description = `
                Get a Blog by blog id(ObjectId)!</br></br>
                <b>Permission= No Permission</b></br>  
            `
            #swagger.responses[200] = {
            description: 'Successfully Found!',
                schema: { 
                    error: false,
                    message: "Blog is found!",
                    data:{$ref: '#/definitions/Blog'} 
                }
            }

            #swagger.responses[400] = {
            description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
            }

            #swagger.responses[404] = {
            description:`Not found - Blog not found!`
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

    //check blog is exist
    // const blog = await isExistOnTableOr404(
    //   Blog,
    //   { _id: req.params.id },
    //   "Blog not found!"
    // );
    const blog = await Blog.findOne({ _id: req.params.id }).populate([
      { path: "userId", select: " username image" },
      { path: "categoryId", select: "name" },
    ]);

    if (!blog) {
      throw new CustomError("Blog not found!", 404);
    }

    await Blog.updateOne(
      { _id: req.params.id },
      { $inc: { countOfVisitors: 1 } }
    );

    res.json({
      error: false,
      message: `Blog is found!`,
      data: blog,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Create Blog"
            #swagger.description = `
                Create a Blog!</br></br>
                <b>Permission= Loginned user</b></br></br>
                - title field length between 3 to 50</br> 
                - content field length between 3 to 50000</br> 
                - image field max Length: 1000</br> 
                - userId and categoryId should exist at their own collections</br> 
                - File uploads with multipart form data</br>
                - Required fields : categoryId, title, content, image(or file upload), isPublish </br>
                - if image field and file upload are comes together, file upload will happen!</br>
                - userId automaticly set!</br>
                - likes and countOfVisitors fields are restricted to modify from here</br>
                </br> 
            `


            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
              description: 'Upload blog image!',
            }


            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{ 
                    $categoryId : '66cc45cff067d55adc479cc6',
                    $title : 'example title',
                    $content : 'example content',
                    $image : 'http:// or https:// or file upload',
                    $isPublish: true, 
                }
            }
            #swagger.responses[201] = {
            description: 'Successfully created!',
            schema: { 
                error: false,
                message: "A new blog is created!",
                data:{$ref: '#/definitions/Blog'} 
            }

        }   


            #swagger.responses[400] = {
            description:`Bad request: </br>
            - categoryId, title, content, isPublish, image(or file upload) fields are required!</br> 
            - Invalid userId, categoryId type(ObjectId)!</br> 
            - Length errors!</br> 
            - image url should start with http:// or https://!</br> 
            - image field or a file uploading with multi-part/form-data is a requirement!</br> 
            </br> 
            
            `
            } 
            #swagger.responses[404] = {
            description:`Not Found: </br>
            - userId not found on users!</br> 
            - categoryId not found on categories!</br> 
            </br> 
            
            `
            } 


        */

    // Check if required fields are provided.
    req.body.userId = req.user._id;

    const { userId, categoryId, title, content, image, isPublish, likes } =
      req.body;

    // Check if required fields are provided.
    mustRequirementOr400({ userId, categoryId, title, content, isPublish });
    // if (!userId || !categoryId || !title || !content) {
    //   throw new CustomError(
    //     "userId, categoryId, title, content fields are required!",
    //     400
    //   );
    // }

    // Checks if the provided userId is a valid MongoDB ObjectId.
    idTypeValidationOr400(userId, "Invalid userId type(ObjectId)!");
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   throw new CustomError("Invalid userId type(ObjectId)!", 400);
    // }

    //  Find user by their user ID and throw an error if the user is not found.
    const user = await isExistOnTableOr404(
      User,
      { _id: userId },
      "userId not found on users!"
    );
    // const user = await User.findOne({_id: userId})
    // if(!user){
    //   throw new CustomError("userId not found on users!", 404);
    // }

    // Checks if the provided categoryId is a valid MongoDB ObjectId.
    idTypeValidationOr400(categoryId, "Invalid categoryId type(ObjectId)!");
    // if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    //   throw new CustomError("Invalid categoryId type(ObjectId)!", 400);
    // }

    //  Find a user by their user ID and throw an error if the user is not found.
    const category = await isExistOnTableOr404(
      Category,
      { _id: categoryId },
      "categoryId not found on categories!"
    );
    // const category = await Category.findOne({_id: categoryId})
    // if(!user){
    //   throw new CustomError("categoryId not found on categories!", 404);
    // }

    //title length check
    lengthValidationOr400(title, "title", 3, 200);
    //content length check
    lengthValidationOr400(content, "content", 3, 50000);

    //image or file upload checks
    if (image) {
      if (!urlValidation(image)) {
        //Validates the URL of an image if provided, otherwise throws an error.
        throw new CustomError(
          "image url should start with http:// or https://",
          400
        );
      }
    } else {
      // Throws a CustomError if the request does not contain a file and a image.
      if (!req.file) {
        throw new CustomError(
          "image field or a file uploading with multi-part/form-data is a requirement!",
          400
        );
      }

      // Updates the image path in the request body with the uploaded image filename.
      req.body.image =
        process.env.IMAGE_HOST + "/api/uploads/" + req.file.filename;
    }

    //image length check
    lengthValidationOr400(req.body.image, "image", 3, 1000);

    //isPublish

    //restrict fields while creating a new blog post
    delete req.body.likes;
    delete req.body.countOfVisitors;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const newBlog = await Blog.create(req.body); //create new blog

    res.status(201).json({
      error: false,
      message: "A new blog is created!",
      data: newBlog,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.description = `
                Update a Blog with id(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br>
                - Users can update just own blogs</br>
                - Admin user can update all blogs</br>
                </br>
                - title field length between 3 to 50</br> 
                - content field length between 3 to 50000</br> 
                - image field max Length: 1000</br> 
                - userId and categoryId should exist at their own collections</br> 
                - File uploads with multipart form data</br>
                - Required fields : categoryId, title, content, image(or file upload), isPublish </br>
                - if image field and file upload are comes together, file upload will happen!</br>  
                - userId, likes and countOfVisitors fields are restricted to modify from here</br>
                </br> 
            `

            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
              description: 'Upload blog image!',
            }


            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $categoryId : '66cc45cff067d55adc479cc6',
                    $title : 'example title',
                    $content : 'example content',
                    $image : 'http:// or https:// or file upload',
                    $isPublish: true
                }
            }

            #swagger.responses[202] = {
            description: 'Successfully updated!',
            schema: { 
                error: false,
                message: "Blog is updated!",
                data:{$ref: '#/definitions/Blog'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request: </br>
            - categoryId, title, content, isPublish, image(or file upload) fields are required!</br>
            - Invalid param Id, categoryId, userId type! (it Should be ObjectId)!</br> 
            - Length errors!</br> 
            - image url should start with http:// or https://!</br> 
            - image field or a file uploading with multi-part/form-data is a requirement!</br>  
            
            `
            }
            #swagger.responses[403] = {
            description:`Forbidden: </br>
            - You are not authorized to update this blog!</br>  
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - Blog not found for update!</br> 
            - Category not found on categories!</br> 
            
            `
            }
            #swagger.responses[500] = {
            description:`Something went wrong! - Blog is found! But it couldn't be updated!`
            }




        */

    //id type validation
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)!"
    );

    //check if there is a blog post with sended id
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: req.params.id },
      "Blog not found!"
    );

    //users can update just own blogs
    const userId = req?.user?._id;

    //Checks if the user making the request is authorized to update a specific blog.
    if (!req.user.isAdmin) {
      if (userId != (blog?.userId)) {
        throw new CustomError(
          "You are not authorized to update this blog!",
          403
        );
      }
    }

    //desturuct body
    const { categoryId, title, content, image, isPublish, likes } = req.body;

    mustRequirementOr400({ categoryId, title, content, isPublish });

    // Checks if the provided categoryId is a valid MongoDB ObjectId.
    idTypeValidationOr400(categoryId, "Invalid categoryId type(ObjectId)!");
    //  Find a user by their user ID and throw an error if the user is not found.
    const category = await isExistOnTableOr404(
      Category,
      { _id: categoryId },
      "categoryId not found on categories!"
    );

    //title length check
    lengthValidationOr400(title, "title", 3, 200);
    //content length check
    lengthValidationOr400(content, "content", 3, 50000);

    //image or file upload checks
    if (image) {
      if (!urlValidation(image)) {
        //Validates the URL of an image if provided, otherwise throws an error.
        throw new CustomError(
          "image url should start with http:// or https://",
          400
        );
      }
    } else {
      // Throws a CustomError if the request does not contain a file and a image.
      if (!req.file) {
        throw new CustomError(
          "image field or a file uploading with multi-part/form-data is a requirement!",
          400
        );
      }

      // Updates the image path in the request body with the uploaded image filename.
      req.body.image =
        process.env.IMAGE_HOST + "/api/uploads/" + req.file.filename;
    }

    //image length check
    lengthValidationOr400(req.body.image, "image", 3, 1000);

    //restrictions
    delete req.body.userId;
    delete req.body.likes;
    delete req.body.countOfVisitors;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const { modifiedCount } = await Blog.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Blog is found! But it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Blog is updated!",
      data: await Blog.findOne({ _id: req.params.id }),
    });
  },
  partialUpdate: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Partial Update Blog"
            #swagger.description = `
                Partially Update a Blog with id(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br>
                - Users can update just own blogs</br>
                - Admin user can update all blogs</br>
                </br>
                - title field length between 3 to 50</br> 
                - content field length between 3 to 50000</br> 
                - image field max Length: 1000</br> 
                - userId and categoryId should exist at their own collections</br> 
                - File uploads with multipart form data</br>
                - Required fields, at least one of them : categoryId, title, content, image(or file upload), isPublish,requestFile(file uploading) </br>
                - if image field and file upload are comes together, file upload will happen!</br> 
                - userId, likes and countOfVisitors fields are restricted to modify from here</br>
                </br> 
            `

            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
              description: 'Upload blog image!',
            }

            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    categoryId : '66cc45cff067d55adc479cc6',
                    title : 'example title',
                    content : 'example content',
                    image : 'http:// or https:// or file upload',
                    isPublish: true
                }
            }

            #swagger.responses[202] = {
            description: 'Successfully partiallyupdated!',
            schema: { 
                error: false,
                message: "Blog is partially updated!",
                data:{$ref: '#/definitions/Blog'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request: </br>
            - At least one field is required: categoryId, title, content, isPublish, image(or file upload) !</br>
            - Invalid param Id, categoryId, userId type! (it Should be ObjectId)!</br> 
            - Length errors!</br> 
            - image url should start with http:// or https://!</br> 
            - image field or a file uploading with multi-part/form-data is a requirement!</br>  
            
            `
            }
            #swagger.responses[403] = {
              description:`Forbidden: </br>
                  - You are not authorized to update this blog!</br>  
      
              `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - Blog not found for update!</br> 
            - Category not found on categories!</br> 
            
            `
            }
            
            #swagger.responses[500] = {
            description:`Something went wrong! - Blog is found! But it couldn't be updated!`
            }




        */

    //id type validation
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)!"
    );

    //check if there is a blog post with sended id
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: req.params.id },
      "Blog not found!"
    );

    //users can update just own blogs
    const userId = req?.user?._id;

    //Checks if the user making the request is authorized to update a specific blog.
    if (!req.user.isAdmin) {
      if (userId != (blog?.userId)) {
        throw new CustomError(
          "You are not authorized to update this blog!",
          403
        );
      }
    }

    //desturuct body
    const { categoryId, title, content, image, isPublish, likes } = req.body;

    partialRequirementOr400({
      categoryId,
      title,
      content,
      isPublish,
      image,
      requestFile: req?.file,
    });

    // Checks if the provided categoryId is a valid MongoDB ObjectId.
    if (categoryId) {
      idTypeValidationOr400(categoryId, "Invalid categoryId type(ObjectId)!");
      //  Find a user by their user ID and throw an error if the user is not found.
      const category = await isExistOnTableOr404(
        Category,
        { _id: categoryId },
        "categoryId not found on categories!"
      );
    }

    //title length check
    if (title) {
      lengthValidationOr400(title, "title", 3, 200);
    }
    //content length check
    if (content) {
      lengthValidationOr400(content, "content", 3, 50000);
    }

    //image or file upload checks
    if (image) {
      if (!urlValidation(image)) {
        //Validates the URL of an image if provided, otherwise throws an error.
        throw new CustomError(
          "image url should start with http:// or https://",
          400
        );
      }
      //image length check
      lengthValidationOr400(image, "image", 3, 1000);
    } else {
      //
      if (req.file) {
        // Updates the image path in the request body with the uploaded image filename.
        req.body.image =
          process.env.IMAGE_HOST + "/api/uploads/" + req.file.filename;
        //image length check
        lengthValidationOr400(req.body.image, "image", 3, 1000);
      }
    }

    //restrictions
    delete req.body.userId;
    delete req.body.likes;
    delete req.body.countOfVisitors;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const { modifiedCount } = await Blog.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Blog is found! But it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Blog is partially updated!",
      data: await Blog.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Delete a Blog"
        #swagger.description = `
            Delete a Blog by blog id(ObjectId)!</br></br>
            <b>Permission= Loginned user</b></br>
                - Users can delete just own blogs</br>
                - Admin user can delete all blogs</br>
                </br>  
        `
        #swagger.responses[200] = {
        description: 'Successfully Deleted!',
            schema: { 
                error: false,
                message: "Blog is deleted!",
                data:{$ref: '#/definitions/Blog'} 
            }
        }

        #swagger.responses[400] = {
        description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
        }
        
        #swagger.responses[403] = {
          description:`Forbidden: </br>
              - You are not authorized to delete this blog!</br>  
  
          `
        }
        #swagger.responses[404] = {
        description:`Not found - Blog not found for deletion!`
        }
        #swagger.responses[500] = {
        description:`Something went wrong! - Blog is found! But it couldn't be deleted!`
        }

*/

    //param id validation check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)!"
    );

    //check if the blog is exist on collection
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: req.params.id },
      "Blog not found for deletion!"
    );

    //users can delete just own blogs
    const userId = req?.user?._id;

    //Checks if the user making the request is authorized to delete a specific blog.
    if (!req.user.isAdmin) {
      if (userId != (blog?.userId)) {
        throw new CustomError(
          "You are not authorized to delete this blog!",
          403
        );
      }
    }

    //delete
    const { deletedCount } = await Blog.deleteOne({ _id: req.params.id });
    //check if blog is deleted
    if (deletedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Blog is found! But it couldn't be deleted!",
        500
      );
    }

    // send success status for deletion
    res.sendStatus(204);
  },
  postLike: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Post Like"
            #swagger.description = `
                Post like for a Blog with param blogId(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br></br>
                - param id is BlogId </br> 
                - userId comes from login</br>  
                - if user liked it before, then that like get removed!</br> 
                </br> 
            `
 
 

            #swagger.responses[200] = {
            description: 'Successfully liked!',
            schema: { 
                error: false,
                message: "User liked the blog!",  
                countOflikes: 3,
                data:{$ref: '#/definitions/Blog'} 
            }

        }  

            #swagger.responses[400] = {
            description:`Bad request: </br> 
            - Invalid param BlogId, userId type! (it Should be ObjectId)!</br> 
            - Length errors!</br>  
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - Blog not found on blogs!</br> 
            - User not found on users!</br> 
            
            `
            } 




        */

    //blogid type check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param blogId type! (it Should be ObjectId)!"
    );

    //find the blog
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: req.params.id },
      "Blog not found on Blogs!"
    );

    const likeUserId = req?.user?._id;

    //required fields
    mustRequirementOr400(likeUserId);

    //likeUserId id type check
    idTypeValidationOr400(
      likeUserId,
      "Invalid  userId type! (it Should be ObjectId)!"
    );

    //find the user
    const user = await isExistOnTableOr404(
      User,
      { _id: likeUserId },
      "User(likeUserId) not found on Users!"
    );

    let message = "";
    let userLiked = null;
    //check if user already liked this blog
    if (blog.likes.includes(likeUserId)) {
      let indexToRemove = blog.likes.indexOf(likeUserId);
      if (indexToRemove !== -1) {
        blog.likes.splice(indexToRemove, 1);

        message = "User unliked the blog!";
        userLiked = false;
      }
    } else {
      //add user id to likes array
      blog.likes.push(likeUserId);
      message = "User liked the blog!";
      userLiked = true;
    }

    //save the changes
    await blog.save();

    //send success status for like
    res.status(200).json({
      error: false,
      message,
      countOfLikes: blog?.likes.length,
      userLiked,
      data: blog,
    });
  },
  getLike: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Post Like"
            #swagger.description = `
                Post like for a Blog with param blogId(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br></br>
                - param id is BlogId </br> 
                - userId comes from login</br>  
                - User just gets the likes of a asked blog!</br> 
                </br> 
            `
 
 

            #swagger.responses[200] = {
            description: 'Successfully listed!',
            schema: { 
                error: false,
                message: "Blog post likes are listed!", 
                likes:["66ccd20f801a1bb658076c31", "66cc1c7e692492ee34cd79b6"],
                countOflikes: 3,
                data:{$ref: '#/definitions/Blog'} 
            }

        }  

            #swagger.responses[400] = {
            description:`Bad request: </br> 
            - Invalid param BlogId, userId type! (it Should be ObjectId)!</br> 
            - Length errors!</br>  
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - Blog not found on blogs!</br> 
            - User not found on users!</br> 
            
            `
            } 




        */

    //blogid type check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param blogId type! (it Should be ObjectId)!"
    );

    //find the blog
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: req.params.id },
      "Blog not found on Blogs!"
    );

    const likeUserId = req?.user?._id;

    //required fields
    // mustRequirementOr400(likeUserId);

    //likeUserId id type check
    idTypeValidationOr400(
      likeUserId,
      "Invalid  userId type! (it Should be ObjectId)!"
    );

    //find the user
    const user = await isExistOnTableOr404(
      User,
      { _id: likeUserId },
      "User(likeUserId) not found on Users!"
    );

    //send success status for like
    res.status(200).json({
      error: false,
      message: "Blog post likes are listed!",
      likes: blog?.likes,
      countOfLikes: blog?.likes.length,
      data: blog,
    });
  },
  getBlogsOfUser: async (req, res) => {
    /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Blogs of a user"
            #swagger.description = `
                Get blogs of a user with param userId(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br></br>
                - userId comes with login</br>     
                </br> </br> 
                You can send query with endpoint for filter[],search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
 
 

            #swagger.responses[200] = {
            description: 'Successfully listed blogs of the users!',
            schema: { 
                error: false,
                message: "Blogs of the user are listed!",  
                data:{$ref: '#/definitions/Blog'} 
            }

        }  

            #swagger.responses[400] = {
            description:`Bad request: </br> 
            - Invalid userId type! (it Should be ObjectId)!</br>  
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - User not found on users!</br> 
            
            `
            } 




        */
    console.log("girdi");

    const userId = req.user?._id;
    //commentid type check
    idTypeValidationOr400(
      userId,
      "Invalid param userId type! (it Should be ObjectId)!"
    );

    //find the comment
    const user = await isExistOnTableOr404(
      User,
      { _id: userId },
      "User not found on users!"
    );

    const blogs = await res.getModelList(Blog, { userId }, [
      { path: "userId", select: "username image" },
      { path: "categoryId", select: "name" },
    ]);

    //send success
    res.status(200).json({
      error: false,
      message: "Blogs of the User are listed!",

      details: await res.getModelListDetails(Blog, { userId }),
      data: blogs,
    });
  },
};
