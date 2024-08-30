"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Main Routes                                */
/* -------------------------------------------------------------------------- */



/* ------------------------------------ imports ----------------------------------- */

const router = require('express').Router();



/* ------------------------------------ routes ----------------------------------- */

//Routes
router.use('/documents',require('./documentRouter'));
router.use('/users',require('./userRouter'));
router.use('/tokens',require('./tokenRouter'));
router.use('/auth',require('./authRouter'));
router.use('/categories',require('./categoryRouter'));
router.use('/blogs',require('./blogRouter'));
router.use('/comments',require('./commentRouter'));

 




/* ------------------------------------ c ----------------------------------- */
module.exports = router;