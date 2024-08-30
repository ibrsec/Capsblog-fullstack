'use strict';


/* -------------------------------------------------------------------------- */
/*                               Category Router                              */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const {blog} = require('../controllers/blogController');
const permissons = require('../middlewares/permissions');
const upload = require('../middlewares/upload');
/* -------------------------------------------------------------------------- */

router.route('/')
.get(blog.list)
.post(permissons.isLogin, upload.single('image'), blog.create);
router.route('/:id')
.get(permissons.isLogin,blog.read)
.put(permissons.isLogin, upload.single('image'), blog.update) 
.patch(permissons.isLogin, upload.single('image'), blog.partialUpdate) 
.delete(permissons.isLogin,blog.delete)

router.post('/:id/postLike', permissons.isLogin, blog.postLike)
router.get('/:id/getLike', permissons.isLogin, blog.getLike)
router.get('/of/user', permissons.isLogin, blog.getBlogsOfUser)

/* -------------------------------------------------------------------------- */
module.exports = router;

