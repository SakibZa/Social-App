const mongoose=require('mongoose');
//user me ham multer ka use kr rhe hai kunki hame user ki profile change krni hai
const multer=require('multer');
//path ham le rhe hai kunki database me file store nhi hogii sirf uska url store hoga
const path=require('path');

//yha ham ye btayenge ki konsi jgah hmare photos ka path store hoga 
//require ham usko krte hai jo export hota hai 
const AVATAR_PATH=path.join('/uploads/users/avatars');


const schema=new mongoose.Schema({
  email:
  {
    type:String,
    
    unique:true
  },
  password:
  {
    type:String
  },
  name:
  {
    type:String
  },
  //is avatar me hmare photo ka url store hoga database me 
  avatar:{
    type:String
  }
 

},{
    timestamps:true
});

let storage = multer.diskStorage({
  //cb means call back function 
  destination: function (req, file, cb) {

        //The destination option is a callback function that takes three arguments:

// req, which is the incoming request object.

// file, which is the incoming file object , it comes from ejs file

// cb, which is again another callback function.

// We call the cb function that takes the two arguments. The first is error which we are going to pass null to. The second is the destination folder which is public.

// The second option that this method takes is the filename. 
// It is almost the same as the destination option except in this, 
// the inner callback function takes the filename as the second argument.
// ..means ham user.js mai hai to ham .. use krenge to ham phle bale dot se model per aayenge dosre bale . se AUTHECATIONUSINGPASSPORT folder me aayneg tab ham uploads folder dhoondenge .
    cb(null, path.join(__dirname,'..',AVATAR_PATH))
  },
  filename: function (req, file, cb) {
    //isme file jo view.ejs me input type file diya hai use access kr rha hai 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //jitne bhi file store hogi wo ik time period ke sath store hogii 
    //kunki agr ik se jyada file store hogii to ham use time se hi bta sakte hai ki wo unique hai 
    //fieldname is avatar here
    //fielname jab time add nhi hota hai use khte hai
    //fieldname jab time add ho jata hai
    cb(null, file.fieldname + '-' + uniqueSuffix);
    
  }
});


//statics function 
//jo uper  multer.diskStorage hai usko hamne storage me liya abb us storage ko ham multer ke storage me use kr rhe hai
//aur single ka means hai ki mai only ik photos upload kr rhe hai  
schema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');

//ham chathe hai ki path bhi globally access ho

schema.statics.avatarPath=AVATAR_PATH;


const Social=mongoose.model('Social',schema);
module.exports=Social;