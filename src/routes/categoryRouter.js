'use strict';


/* -------------------------------------------------------------------------- */
/*                               Category Router                              */
/* -------------------------------------------------------------------------- */
const router = require('express').Router();
const {category} = require('../controllers/categoryController');
const permissons = require('../middlewares/permissions');
/* -------------------------------------------------------------------------- */

router.route('/')
.get(category.list)
.post(permissons.isAdmin,category.create);
router.route('/:id')
.get(permissons.isLogin,category.read)
.put(permissons.isAdmin,category.update) 
.delete(permissons.isAdmin,category.delete)


/* -------------------------------------------------------------------------- */
module.exports = router;

