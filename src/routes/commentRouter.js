'use strict';


/* -------------------------------------------------------------------------- */
/*                               Category Router                              */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const {comment} = require('../controllers/commentController');
const permissons = require('../middlewares/permissions'); 
/* -------------------------------------------------------------------------- */

router.route('/')
.get(comment.list)
.post(permissons.isLogin, comment.create);
router.route('/:id')
.get(permissons.isLogin,comment.read)
.put(permissons.isLogin, comment.update) 
.patch(permissons.isLogin, comment.partialUpdate) 
.delete(permissons.isLogin,comment.delete)

router.get("/ofBlog/:id", permissons.isLogin, comment.getBlogsComments);
 
/* -------------------------------------------------------------------------- */
module.exports = router;

