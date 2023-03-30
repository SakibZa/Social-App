const mongoose=require('mongoose');
const CommentSchema=new mongoose.Schema({

  content:{

       type:String
  },
  //comment user se belong krta hai to user ka relation bhi dena hoga
  user:{
       //ye jab kaam aata hai jab ham data ko fetch krte hai ye us id ko utha kr user ke reference me aata hai aur bolta hai ye social hai to wo social collection me us releated user ko dhoondta hai
      type:mongoose.Schema.Types.ObjectId,
      ref:'Social'
  },
  //comment post se bhi relation rkhta hai to post ka bhi refernece dena hoga 
post:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }
},{
    timestamps:true
});
const Comment=mongoose.model('Comment',CommentSchema);
module.exports=Comment;