const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){
//phle post ko find krenge aur us post per hi comment krenge
Post.findById(req.body.post,function(err,post){
     
    if(post)
    {
        //agar post available hai to comment create kr rhe hai abb comment schema me teen cheeze hai ye un teeno cheezo le lega 
        Comment.create({
           content:req.body.comment,
            user:req.user.id,
            post:req.body.post
    
        },function(err,comment){
         //jo comment bni hai us comment ko post me push kr dega 
         //kunki post ke schema me comment bhi ik option hai isliye usme ham push kr rhe hai 
         
            post.comments.push(comment);
            //local storage se permanent storage me save kr dega
            post.save();
          
        });
    }
    return res.redirect('back');


});
   
   
}

//for deleteing the comment 
// module.exports.destroy=function(req,res){

//     //jis comment ko delete krna hai phle use dhoondenge wo hame ejs se milega is liye hamne param ka use kiya hai
//    Comment.findById(req.params.id,function(err,comment){

//       //jisne comment ki hai wo id comment.user se milegii aur jisne login kiya hai wo req.user.id se milega iske bad agr wo match kre tabhi delete krenge 
//      if(comment.user==req.user.id){
 
//          //comment schema me post bhi hai user bhi hai agr hamne poori comment delete kr dii to post ki id bhi delete ho jayegii aur user ki id bhi
//          //post ki id agr delete ho gyii 
//          // to post schema me comment array hai usme bhut sari comments id hai 
//          // ye ham isliye kr rhe hai kunki post me bhi comment array hai wha se bhi to mujhe remove krna hai comment  
//           let postId=comment.post; 
//           // yha mai comment ko remove kr rha hoo
//           comment.remove();
//           //uske bad maine jo comment schema me post id save ki thi us id se post ko find kronga aur comment array me se use nikal donga 
//           Post.findByIdAndUpdate(postId,
//             {
//                 //pull function post ke comments me jayega aur views k home.ejs se jo mujhe id mil rhi hai us comment id ko remove kr donga 
//                 //array se 
//                 $pull:
//                 {
//                     comments:req.params.id
//                 }},function(err,post){

//             return res.redirect('back');
//           })
      
//         // Post.findById(postId,function(err,po){
//         //     console.log(po);
//         //     return res.redirect('back');
//         // })
  
         
//      }else{
//         return res.redirect('back');
//      }

//    });
// }

// uper bale code ko ham async await se sove krenge 



module.exports.destroy= async function(req,res){

    //jis comment ko delete krna hai phle use dhoondenge wo hame ejs se milega is liye hamne param ka use kiya hai
  let comment=await Comment.findById(req.params.id);
      //jisne comment ki hai wo id comment.user se milegii aur jisne login kiya hai wo req.user.id se milega iske bad agr wo match kre tabhi delete krenge 
     if(comment.user==req.user.id){
 
         //comment schema me post bhi hai user bhi hai agr hamne poori comment delete kr dii to post ki id bhi delete ho jayegii aur user ki id bhi
         //post ki id agr delete ho gyii 
         // to post schema me comment array hai usme bhut sari comments id hai 
         // ye ham isliye kr rhe hai kunki post me bhi comment array hai wha se bhi to mujhe remove krna hai comment  
          let postId=comment.post; 
          // yha mai comment ko remove kr rha hoo
          comment.remove();
          //uske bad maine jo comment schema me post id save ki thi us id se post ko find kronga aur comment array me se use nikal donga 
        let post= await Post.findByIdAndUpdate(postId,
            {
                //pull function post ke comments me jayega aur views k home.ejs se jo mujhe id mil rhi hai us comment id ko remove kr donga 
                //array se 
                $pull:
                {
                    comments:req.params.id
                }}
        );

        return res.redirect('back');
      
        // Post.findById(postId,function(err,po){
        //     console.log(po);
        //     return res.redirect('back');
        // })
            }
        }
         
     


