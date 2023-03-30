
 const User=require ('../models/schema');
 const Post=require ('../models/post');
 const Comment=require ('../models/comment');
 const fs=require('fs');
 const path=require('path');
  //jab localhost:8000/user/sigup  koi dalega to ye call hoga

module.exports.signup=function(req,res){

   return res.render('sign_up');
     
 }
 // jab bhi koi form ke signup per click krega to ye function call hoga button dbne ke bad
 module.exports.create=function(req,res)
 {

       User.findOne({email:req.body.email},function(err,user){

                if(err)
                {
                  console.log(err);
                } 
                if(user){
                  return res.render('sign_in');
                }
                if(!user){

                  User.create(req.body,function(err,user){

                       if(err){
                        console.log(err);
                       }

                  })


                  return res.render('sign_in');
                }

       });

 }
 //jab localhost:8000/user/sigin  koi dalega to ye call hoga
 module.exports.signin=(req,res)=>{
       
   return res.render('sign_in');

 }
// ye jab login ka jo button hai jo signin form me bnaya gya jab us button per click krenge to ye chlega
 module.exports.createSession=(req,res)=>{
  

      //login krte time flash meesage appear ho isliye mai yha set kr rha hoo

      req.flash('success','logged in Succesfully');

       // abb ye req hai ise res me convert krna pdega hame resposnse send krna hai ejs page ko 



            // jaise hi ham create session button per click kre to sari cheeze passport smbhal lega idhar sirf hme render krna hai
             //console.log(req.user.id);
            return res.redirect('/user/profile');
          }
 // login krne ke bad ye function chlega agr cookie set hai to home khulega nhi to return krega sign in page ko
// module.exports.home=function(req,res){
  
//     //populate function post ke user me jayega wha se id ko lekr aur refernce ke collection me se data ko search krega
//   Post.find({}).populate('user').populate({
//     //post ko find krega aur user bale block me jayega wha se id lekr user ka jo collection hai wha se post ko search krega 
//     //iske bad second populate comment ka hai comment ki id lega aur uske collection me comment ko search krega
    
//     path:'comments',
//     // abb comment schema me user bhi hai use bhi ham print krana chathe hai to uske liye ye work krega 
//           populate:{
//             path:'user'
//           }

//    })
  
   
  
//   .exec(function(err,user){

//     if(err){
//      console.log(err);
    
//     }
//     //sare user mai screen per print krana chatha hoo isliye ye query run kr rha hoo
//   User.find({},function(err,users){

//     return res.render('home',{
//       posts:user, 
//        all_u:users 

//     });

//   });

//   //return res.render('home',{posts:user});
    
//  });
 



// }

                ////***  uper jo code likha hai use async await function likhnege 
                /* syncronous function 
                
                  As the name suggests synchronous means to be in a sequence, i.e. every statement of the code gets executed one by one. So, basically a statement has to wait for the earlier statement to get executed.
                
                */


            
            
           // Asyncronous function 

            //Because of this, most modern asynchronous JavaScript methods don't use callbacks. Instead, in JavaScript, asynchronous programming is solved
            
            
            //The await keyword can only be used inside an async function.

//The await keyword makes the function pause the execution and wait for a resolved promise before it continues:
  
// Query ke sath await use kro .
            
   
module.exports.home= async function(req,res){
  
    //populate function post ke user me jayega wha se id ko lekr aur refernce ke collection me se data ko search krega
  let Posts = await Post.find({}).populate('user').populate({
    //post ko find krega aur user bale block me jayega wha se id lekr user ka jo collection hai wha se post ko search krega 
    //iske bad second populate comment ka hai comment ki id lega aur uske collection me comment ko search krega
    
    path:'comments',
    // abb comment schema me user bhi hai use bhi ham print krana chathe hai to uske liye ye work krega 
          populate:{
            path:'user'
          }

   })
  
   
  //async await me call back function ki zaarrorat nhi hoti 
  // .exec(function(err,user){

  //   if(err){
  //    console.log(err);
    
  //   }
    //sare user mai screen per print krana chatha hoo isliye ye query run kr rha hoo
  let users= await User.find({})

    return res.render('home',{
      posts:Posts, 
       all_u:users 

    });

  }

  //return res.render('home',{posts:user});
    
 










   
//jab signout per click kra jaye to ye function call hoga
module.exports.signout=function(req,res){

    req.logout((err)=>{
      if(err){
      return next(err);
    
    }
    
   // req.flash('success','you have logged out!');
   req.flash('error','logged out');
    return res.redirect('/user/signin');
  
  });
   
    

}
module.exports.post=function(req,res){

  // Post.create({

  //     content:req.body.post,
  //     user:req.socials.id
      

  // })
  // console.log(req.user.id);
  // console.log("Hello Creted");
}


//ye view function chlega  
module.exports.view=function(req,res){

   //hamne view me url diya tha user/view/<%=uu.id %> isko req.params.id handle krega 
  User.findById(req.params.id,function(err,uu){


      return res.render('view',{uu:uu});
  });
}


module.exports.update= async (req,res)=>{

     
     // ham user ko update kr rhe hai 
     try{

          //us user ko find kr rhe hai jo login hai aur jise update krna hai
          let user=await User.findById(req.params.id);
          //User schema ki help se ham uploadedAvatar ko access kr rhe hai 
          //uploaded avatar me storage variable hai jisme 
           User.uploadedAvatar(req,res,function(err){
             if(err){
               console.log(err);
             }
            
               //uploaded avatar ka jo multer hai wo abb form ki req ko handle krega 
               user.name=req.body.name;
               user.email=req.body.email;

               //agr user profile change krna chatha hai tbhi change krenge hr bar change nhi krenge 
               if(req.file){
                         //avatar me wo string store kr rhe hai 
                         //this is saving the path of uploaded file into the avatar field in the user

                         if(user.avatar){

                          //The Node.js file system module allows you to work with the file system on your computer.
//                           Common use for the File System module:

// Read files
// Create files
// Update files
// Delete files
// Rename files
                          fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                         }

                       user.avatar=User.avatarPath+'/'+req.file.filename;
               }

              // yha ham koi bhi query nhi chla rhe hai update bgaira seedha user.name aur user.email me store kra rhe hai
              //user.save(); usko permenantly store kra dega database me 
                user.save();

             return res.redirect('back');
           })
        

     }catch(err){
      console.log(err);
     }

}
