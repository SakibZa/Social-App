//  const express=require('express');
//  const router=express.Router();
// const homeController=require('../controllers/home_controller');
// console.log('router Loaded');

// router.use('/user',require('./user'));
// module.exports=router;
const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
// jab bhi koi sirf localhost:8000 dalega to ye call hoga 
router.get('/',homeController.home);




// jab koi localhost:8000/user/.... dalega to ye us routes per le jayega
router.use('/user',require('./user'));
// jab koi localhost:8000/post/.... dalega to ye us routes per le jayega
router.use('/post',require('./post'));
// jab koi localhost:8000/comment/.... dalega to ye us routes per le jayega
router.use('/comment',require('./comment'));


module.exports=router;
