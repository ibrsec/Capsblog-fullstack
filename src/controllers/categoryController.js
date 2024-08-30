"use strict";
 
const CustomError = require("../errors/customError");
const {
  idTypeValidationOr400,
  isExistOnTableOr404,
  mustRequirementOr400,
  lengthValidationOr400,
  isUniqueOnTableOr409,
  capitalize,
} = require("../helpers/utils");
/* -------------------------------------------------------------------------- */
/*                             Category Controller                            */
/* -------------------------------------------------------------------------- */

const { Category } = require("../models/categoryModel");

module.exports.category = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Categories"
            #swagger.description = `
                List all Categories!</br></br>
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
                    message: "Categories are listed!",
                    data:{$ref: '#/definitions/Category'} 
                }
            }


        */
    const categories = await res.getModelList(Category);
    res.json({
      error: false,
      message: `Categories are listed!`,
      details: await res.getModelListDetails(Category),
      data: categories,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Get a Category"
            #swagger.description = `
                Get a Category by category id(ObjectId)!</br></br>
                <b>Permission= Loginned user</b></br>  
            `
            #swagger.responses[200] = {
            description: 'Successfully Found!',
                schema: { 
                    error: false,
                    message: "Category is found!",
                    data:{$ref: '#/definitions/Category'} 
                }
            }

            #swagger.responses[400] = {
            description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
            }

            #swagger.responses[404] = {
            description:`Not found - Category not found!`
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

    const category = await isExistOnTableOr404(
      Category,
      { _id: req.params.id },
      "Category not found!"
    );
    // const category = await Category.findOne({ _id: req.params.id });

    // if (!category) {
    //   throw new CustomError("Category not found!", 404);
    // }

    res.json({
      error: false,
      message: `Category is found!`,
      data: category,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Create Category"
            #swagger.description = `
                Create a Category!</br></br>
                <b>Permission= Admin user</b></br></br>
                - Category name max length: 15</br> 
                - Category name min length: 3</br> 
                - Category name must be unique</br> 
            `

            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $name : 'test category name'
                }
            }
            #swagger.responses[201] = {
            description: 'Successfully created!',
            schema: { 
                error: false,
                message: "A new category is created!",
                data:{$ref: '#/definitions/Category'} 
            }

        }   


            #swagger.responses[400] = {
            description:`Bad request - name field is required!</br> 
            
            `
            }
            #swagger.responses[409] = {
            description:`Conflict - This category is already exist!</br>
            
            `
            }


        */

    // * Checks if a requirement is mandatory based on the provided name in the request body.
    mustRequirementOr400({ name: req.body.name });
    // if (!req.body.name) {
    //   throw new CustomError("name field is required!", 400);
    // }

    req.body.name = capitalize(req.body.name);
    const { name } = req.body;

    //length check
    lengthValidationOr400(name, 'name', 3, 15);



    //unique check
    
    await isUniqueOnTableOr409(Category,{name},"This category is already exist!")
    
    // const existCategory = await Category.findOne({ name: name });
    // if (existCategory) {
    //   throw new CustomError("This category is already exist!", 409);
    // }


    delete req.body.createdAt;
    delete req.body.updatedAt;


    const newCategory = await Category.create(req.body); //create new category

    res.status(201).json({
      error: false,
      message: "A new category is created!",
      data: newCategory,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "UPDATE Category"
            #swagger.description = `
                Update a Category with id(ObjectId)!</br></br>
                <b>Permission= Admin user</b></br></br>
                - Category name max length: 15</br> 
                - Category name min length: 3</br> 
                - Category name must be unique</br> 
            `

            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{
                    $name : 'test category name'
                }
            }
            #swagger.responses[202] = {
            description: 'Successfully updated!',
            schema: { 
                error: false,
                message: "Category is updated!",
                data:{$ref: '#/definitions/Category'} 
            }

        }  
            #swagger.responses[400] = {
            description:`Bad request: </br>
            - name field is required!</br>
            - Invalid param Id type! (it Should be ObjectId)!</br> 
            
            `
            }
            #swagger.responses[404] = {
            description:`Not found: </br>
            - Category not found for update!</br> 
            
            `
            }
            #swagger.responses[409] = {
            description:`Conflict: </br>
            - This category is already exist!</br> 
            
            `
            }
            #swagger.responses[500] = {
            description:`Something went wrong! - Category is found! But it couldn't be updated!`
            }




        */

    //id type validation
    idTypeValidationOr400(req.params.id,"Invalid param Id type! (it Should be ObjectId)!");
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError(
    //     "Invalid param Id type! (it Should be ObjectId)",
    //     400
    //   );
    // }

    mustRequirementOr400({ name: req.body.name });
    // if (!req.body?.name) {
    //   throw new CustomError("name field is required!", 400);
    // }

    //capitalize name
    req.body.name = capitalize(req.body.name);

    //desturuct name
    const { name } = req.body;

    //length check and error
    lengthValidationOr400(name, 'name', 3, 15);
    // if (name.length < 3 || name.length > 50) {
    //   throw new CustomError(
    //     "Category name length should be between 3 to 50!",
    //     400
    //   );
    // }

  



    
    await isExistOnTableOr404(
      Category,
      { _id: req.params.id },
      "Category not found for update!"
    );
    // const category = await Category.findOne({ _id: req.params.id });

    // if (!category) {
    //   throw new CustomError("Category not found for update!", 404);
    // }

      //unique check
      await isUniqueOnTableOr409(
        Category,
        { name },
        "This category is already exist!"
      );
      // const existCategory = await Category.findOne({ name: name });
      // if (existCategory) {
      //   throw new CustomError("This category is already exist!", 409);
      // }



    delete req.body.createdAt;
    delete req.body.updatedAt;



    const { modifiedCount } = await Category.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    if (modifiedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Category is found! But it couldn't be updated!",
        500
      );
    }

    res.status(202).json({
      error: false,
      message: "Category is updated!",
      data: await Category.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
  #swagger.tags = ["Categories"]
  #swagger.summary = "Delete a Category"
  #swagger.description = `
      Delete a Category by category id(ObjectId)!</br></br>
      <b>Permission= Admin user</b></br>  
  `
  #swagger.responses[200] = {
  description: 'Successfully Deleted!',
      schema: { 
          error: false,
          message: "Category is deleted!",
          data:{$ref: '#/definitions/Category'} 
      }
  }

  #swagger.responses[400] = {
  description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
  }

  #swagger.responses[404] = {
  description:`Not found - Category not found for deletion!`
  }
  #swagger.responses[500] = {
  description:`Something went wrong! - Category is found! But it couldn't be deleted!`
  }

*/


    //id check
    idTypeValidationOr400(req.params.id, "Invalid param Id type! (it Should be ObjectId)")
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   throw new CustomError(
    //     "Invalid param Id type! (it Should be ObjectId)",
    //     400
    //   );
    // }


    await isExistOnTableOr404(Category,{ _id: req.params.id }, "Category not found for deletion!")
    // const category = await Category.findOne({ _id: req.params.id });

    // if (!category) {
    //   throw new CustomError("Category not found for deletion!", 404);
    // }

    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });
    if (deletedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Category is found! But it couldn't be deleted!",
        500
      );
    }

    res.sendStatus(204);
  },
};
