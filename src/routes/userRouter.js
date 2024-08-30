"use strict";


const router = require("express").Router();
const { user } = require("../controllers/userController");
const permissions = require('../middlewares/permissions');
const upload = require('../middlewares/upload');

/* ------------------------------------ k ----------------------------------- */

router
    .route("/")
        .get(permissions.isLogin, user.list)
        .post( upload.single('image') , user.create);

router
  .route("/:id")
    .get(permissions.isLogin, user.read)
    .put(permissions.isLogin, upload.single('image'), user.update)
    .patch(permissions.isLogin, upload.single('image'), user.partialUpdate)
    .delete(permissions.isAdmin, user.delete);

/* ------------------------------------ k ----------------------------------- */
module.exports = router;
