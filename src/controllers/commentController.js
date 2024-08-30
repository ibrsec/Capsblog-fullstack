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
/*                             Comment Controller                            */
/* -------------------------------------------------------------------------- */

const { Comment } = require("../models/commentModel");
const { Blog } = require("../models/blogModel");
const { User } = require("../models/userModel");

module.exports.comment = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List all Comments"
            #swagger.description = `
                List all Comments!</br></br>
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
                    message: "All Comments are listed!",
                    data:{$ref: '#/definitions/Comment'} 
                }
            }


        */
    const comments = await res.getModelList(Comment, {}, [
      { path: "userId", select: "username" },
    ]);

    res.json({
      error: false,
      message: `All Comments are listed!`,
      details: await res.getModelListDetails(Comment),
      data: comments,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get a Comment"
            #swagger.description = `
                Get a Comment by comment id(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br>  
            `
            #swagger.responses[200] = {
            description: 'Successfully Found!',
                schema: { 
                    error: false,
                    message: "Comment is found!",
                    data:{$ref: '#/definitions/Comment'} 
                }
            }

            #swagger.responses[400] = {
            description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
            }

            #swagger.responses[404] = {
            description:`Not found - Comment not found!`
            }

        */

    //id check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)"
    );

    const comment = await isExistOnTableOr404(
      Comment,
      { _id: req.params.id },
      "Comment not found!"
    );

    //Responds with a JSON object containing information about a found comment.
    res.json({
      error: false,
      message: `Comment is found!`,
      data: comment,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.description = `
                Create a Comment!</br></br>
                <b>Permission= Loginned user</b></br></br>
                - blogId should exist on blogs</br> 
                - comment field max length is 800</br>  
                - userId comes with login</br> 
                - Required fields : blogId, comment </br>
                </br> 
            `

 


            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{ 
                    $blogId : '66cc45cff067d55adc479cc6',
                    $comment : 'example comment'
                }
            }
            
            #swagger.responses[201] = {
            description: 'Successfully created!',
            schema: { 
                error: false,
                message: "A new comment is created!",
                data:{$ref: '#/definitions/Comment'} 
            }

        }   


            #swagger.responses[400] = {
            description:`Bad request: </br>
            - blogId, comment, userId(comes with login) fields are required!</br> 
            - Invalid userId, blogId type(ObjectId)!</br> 
            - Length errors!</br> 
            </br> 
            
            `
            } 
            #swagger.responses[404] = {
            description:`Not Found: </br>
            - userId not found on users!</br> 
            - blogId not found on blogs!</br> 
            </br> 
            
            `
            } 


        */

    // Assigns the user ID from the request object to the userId property in the request body.
    req.body.userId = req.user._id;

    const { blogId, comment, userId } = req.body;

    // Check if required fields are provided.
    mustRequirementOr400({ blogId, comment, userId });

    // Checks if the provided userId is a valid MongoDB ObjectId.
    idTypeValidationOr400(userId, "Invalid userId type(ObjectId)!");

    //  Find user by their user ID and throw an error if the user is not found.
    const user = await isExistOnTableOr404(
      User,
      { _id: userId },
      "userId not found on users!"
    );

    // Checks if the provided categoryId is a valid MongoDB ObjectId.
    idTypeValidationOr400(blogId, "Invalid blogId type(ObjectId)!");

    //  Find a user by their user ID and throw an error if the user is not found.
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: blogId },
      "blogId not found on blogs!"
    );

    //comment length check
    lengthValidationOr400(comment, "comment", 1, 800);

    //restrict fields while creating a new comment post
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const newComment = await Comment.create(req.body); //create new comment

    res.status(201).json({
      error: false,
      message: "A new comment is created!",
      data: newComment,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.description = `
                Update a Comment with id(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br>
                - Users can update just own comments</br>
                - Admin user can update all comments</br>
                </br>
                - blogId should exist on blogs</br> 
                - comment field max length is 800</br>  
                - userId comes with login</br> 
                - Required fields : blogId, comment </br>
                </br> 
            `
 

            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $blogId : '66cc45cff067d55adc479cc6',
                    $comment : 'example comment'
                }
            }

            #swagger.responses[202] = {
            description: 'Successfully updated!',
            schema: { 
                error: false,
                message: "Comment is updated!",
                data:{$ref: '#/definitions/Comment'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request: </br>
           - blogId, comment, userId(comes with login) fields are required!</br> 
            - Invalid userId, blogId type(ObjectId)!</br> 
            - Length errors!</br> 
            </br>  
            `
            }

            #swagger.responses[403] = {
              description:`Forbidden: </br>
                  - You are not authorized to update this blog!</br>  
      
              `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - userId not found on users!</br> 
            - blogId not found on blogs!</br> 
            </br>             
            `
            }
            #swagger.responses[500] = {
            description:`Something went wrong! - Comment is found! But it couldn't be updated!`
            }

        */

    //id type validation
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)!"
    );

    //check if there is a comment post with sended id
    const commentData = await isExistOnTableOr404(
      Comment,
      { _id: req.params.id },
      "Comment not found!"
    );

    //users can update just own comments, admin can all of them
    const userId = req?.user?._id;
    if (!req?.user?.isAdmin) {
      if (!userId.equals(commentData?.userId)) {
        throw new CustomError(
          "Forbidden - You are not authorized to update this comment!",
          403
        );
      }
    }

    //desturuct body
    const { comment, blogId } = req.body;

    mustRequirementOr400({ comment, blogId });

    // Checks if the provided blogId is a valid MongoDB ObjectId.
    idTypeValidationOr400(blogId, "Invalid blogId type(ObjectId)!");
    //  Find a user by their blog ID and throw an error if the blog is not found.
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: blogId },
      "blogId not found on blogs!"
    );

    //comment length check
    lengthValidationOr400(comment, "comment", 1, 800);

    //restrictions
    delete req.body.userId;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const { modifiedCount } = await Comment.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Comment is found! But it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Comment is updated!",
      data: await Comment.findOne({ _id: req.params.id }),
    });
  },
  partialUpdate: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Partial Update Comment"
            #swagger.description = `
                Partially Update a Comment with id(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br>
                - Users can update just own comments</br>
                - Admin user can update all comments</br>
                </br>
                - blogId should exist on blogs</br> 
                - comment field max length is 800</br>  
                - userId comes with login</br> 
                - Required fields(at least one of them) : blogId, comment </br>
                </br> 
            `


            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    blogId : '66cc45cff067d55adc479cc6',
                    comment : 'example comment'
                }
            }

            #swagger.responses[202] = {
            description: 'Successfully partiallyupdated!',
            schema: { 
                error: false,
                message: "Comment is partially updated!",
                data:{$ref: '#/definitions/Comment'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request: </br>
           - One of the blogId, comment fields are required!</br> 
            - Invalid userId, blogId type(ObjectId)!</br> 
            - Length errors!</br> 
            </br>  
            
            `
            }

            #swagger.responses[403] = {
              description:`Forbidden: </br>
                  - You are not authorized to update this blog!</br>  
      
              `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - userId not found on users!</br> 
            - blogId not found on blogs!</br> 
            </br>           
            `
            }
            
            #swagger.responses[500] = {
            description:`Something went wrong! - Comment is found! But it couldn't be updated!`
            }




        */

    //id type validation
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)!"
    );

    //check if there is a comment post with sended id
    const commentData = await isExistOnTableOr404(
      Comment,
      { _id: req.params.id },
      "Comment not found!"
    );

    //users can update just own comments, admin can all of them
    const userId = req?.user?._id;
    if (!req?.user?.isAdmin) {
      if (!userId.equals(commentData?.userId)) {
        throw new CustomError(
          "Forbidden - You are not authorized to update this comment!",
          403
        );
      }
    }

    //desturuct body
    const { comment, blogId } = req.body;

    partialRequirementOr400({
      comment,
      blogId,
    });

    // Checks if the provided blogId is a valid MongoDB ObjectId.
    if (blogId) {
      idTypeValidationOr400(blogId, "Invalid blogId type(ObjectId)!");
      //  Find a user by their blog ID and throw an error if the blog is not found.
      const blog = await isExistOnTableOr404(
        Blog,
        { _id: blogId },
        "blogId not found on blogs!"
      );
    }

    //title length check
    if (comment) {
      lengthValidationOr400(comment, "comment", 1, 800);
    }

    //restrictions
    delete req.body.userId;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const { modifiedCount } = await Comment.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Comment is found! But it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Comment is partially updated!",
      data: await Comment.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Delete a Comment"
        #swagger.description = `
            Delete a Comment by comment id(ObjectId)!</br></br>
            <b>Permission= Loginned user</b></br>  
                - Users can delete just own comments</br>
                - Admin user can delete all comments</br>
                </br>
                
        `
        #swagger.responses[200] = {
        description: 'Successfully Deleted!',
            schema: { 
                error: false,
                message: "Comment is deleted!",
                data:{$ref: '#/definitions/Comment'} 
            }
        }

        #swagger.responses[400] = {
        description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
        }

        #swagger.responses[403] = {
          description:`Forbidden: </br>
              - You are not authorized to update this blog!</br>  
  
          `
        }
        #swagger.responses[404] = {
        description:`Not found - Comment not found for deletion!`
        }
        #swagger.responses[500] = {
        description:`Something went wrong! - Comment is found! But it couldn't be deleted!`
        }

*/

    //param id validation check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)!"
    );

    //check if the comment is exist on collection
    const commentData = await isExistOnTableOr404(
      Comment,
      { _id: req.params.id },
      "Comment not found for deletion!"
    );

    //users can delete just own comments, admin can all of them
    const userId = req?.user?._id;
    if (!req?.user?.isAdmin) {
      if (userId !=(commentData?.userId)) {
        throw new CustomError(
          "Forbidden - You are not authorized to update this comment!",
          403
        );
      }
    }

    //delete
    const { deletedCount } = await Comment.deleteOne({ _id: req.params.id });
    //check if comment is deleted
    if (deletedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Comment is found! But it couldn't be deleted!",
        500
      );
    }

    // send success status for deletion
    res.sendStatus(204);
  },
  getBlogsComments: async (req, res) => {
    /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get comments of a blog"
            #swagger.description = `
                Get comments of a blog with param blogId(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br></br>
                - param id is blogId </br>     
                </br> 
            `
 
 

            #swagger.responses[200] = {
            description: 'Successfully listed comments of the blog!',
            schema: { 
                error: false,
                message: "Comments of Blog are listed!",  
                data:{$ref: '#/definitions/Comment'} 
            }

        }  

            #swagger.responses[400] = {
            description:`Bad request: </br> 
            - Invalid param blogId type! (it Should be ObjectId)!</br>  
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - Blog not found on blogs!</br> 
            
            `
            } 




        */

    //commentid type check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param blogId type! (it Should be ObjectId)!"
    );

    //find the comment
    const blog = await isExistOnTableOr404(
      Blog,
      { _id: req.params.id },
      "Blog not found on blogs!"
    );

    const comments = await res.getModelList(
      Comment,
      { blogId: req.params.id },
      [{ path: "userId", select: "username image" }]
    );

    //send success status for like
    res.status(200).json({
      error: false,
      message: "Comments of the Blog are listed!",

      details: await res.getModelListDetails(Comment, {
        blogId: req.params.id,
      }),
      data: comments,
    });
  },
};
