const post=require('../models/post');
const comment=require('../models/comment');
const fs=require('fs');
const path=require('path');
module.exports.create=function(req,res){
   
 
  
//    post.create({
//          content:req.body.post,
//           //ye user me kaise id store kr rha hai to hamne set authenticated function me res.locals.users bnaya tha uska matlab ye hai ki agr user login hai to ham uski id wgaira le skate hai
//          user:req.user.id,
//          postAvatar:post.PostAvatarPath+'/'+req.file
// });
post.uploadedPost(req,res,function(err){
   
    if(err){
      console.log("Error to uploading avatar",err);
    }

    var x=" ";
     if(req.file){

      x=post.PostAvatarPath+'/'+req.file.filename;
     }
   post.create({
      content:req.body.post,
      user:req.user.id,
      
      postAvatar:x
    
   });


      // console.log(req.file);

   

   return res.redirect('back');

});
  

    
}

module.exports.destroy=(req,res)=>{
//sabse phle check krenge wo post jo delete krni hai avialable hai ya nhi 
//params ka use ham jab krte hai jab
//The req.params property is an object that contains the properties which 
//are mapped to the named route "parameters".
// For example, if you have a route as /api/:name, 
//then the "name" property is available as req.params.name.
// The default value of this object is {}.
post.findById(req.params.id,function(err,post){

  //authorization jo post maine ki hai wahi delete kr sakta hoo 
  //post.user me id hai aur wo match kr rha hai login user se 
  if(post.user==req.user.id)
  {

    // dekho bhut dhyan se post.postAvatar hame ik url dega suppose
    // PostUploads\\Posts\\post_avatar\\PostAvatar ye diya 
    // ye url usek pass database me store the joki maine post.postAvatar se access kiya hai 
    //iske bad dirname .. ne mujhe directly us folder se jud ba diya 
    //path.join me poori string ayegi PostUploads\\Posts\\post_avatar\\PostAvtar ye bali
    //unlink sinc isko jaker delete krdega 
    fs.unlinkSync(path.join(__dirname,'..',post.postAvatar));

      //remove bhi just like delete hota hai 
     post.remove();
     //hame post ke sath sath uski comment ko bhi delete krna hai 

     //comment ke under jo post name ka schema hai usme to bus post ki id hai agr wo post ki id jo req.params.id se aa rhi hai match kr gyii usko delete krdenge 

      comment.deleteMany({post:req.params.id},function(err)
      {
            return res.redirect('back');
      })
  }else{
      return res.redirect('back');
  }

});

}