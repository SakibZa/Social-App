

const express=require('express');
const userController=require('../controllers/user_controller');
const passport=require('passport');
const router=express.Router();
 console.log('user router is also loaded');


 //jab localhost:8000/user/signup  koi dalega to ye call hoga

router.get('/signup',userController.signup);
// jab koi localhost:8000/user/signup per jayega aur wha per form bhr kr submit per click krega to ye call hoga
router.post('/create',userController.create);
 //jab localhost:8000/user/signup  koi dalega to ye call hoga

router.get('/signin',userController.signin);
// jab koi localhost:8000/user/signin per jayega aur wha per form bhr kr submit per click krega to isko verify passport krega 

router.post('/createSession',passport.authenticate('local',{

      failureRedirect:'/user/signin',
}),userController.createSession);
//jab bhi koi localhost:8000/user/profile per jayega to ye call hoga 
router.get('/profile',passport.checkAuthentication, userController.home);
//signout ki request ko handle krega yha
router.get('/signout',userController.signout);




//jab user ke name per click kiya jayega to ye get function use handle krega aur iske bad ham userController.view per pochenge 
router.get('/view/:id',userController.view);

//jab user update per click krega to ye route use handle krega 
router.post('/update/:id',userController.update);

router.post('/post',userController.post);
// har router ke bad exports krna bhut zaroori hai
module.exports=router;
