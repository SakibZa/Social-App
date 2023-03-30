const express=require('express');
const router=express.Router();
const postController=require('../controllers/post_controller');


router.post('/create',postController.create);
//wha se jo req ayii hai to :id me wo id ayegii aur destroy call hoga jo post_controller me hai 
router.get('/destroy/:id',postController.destroy);


module.exports=router;