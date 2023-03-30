const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');

const Post_Path=path.join('/PostUploads/Posts/post_avatar');
const PostSchema=new mongoose.Schema({

  content:{

       type:String
  },
  user:{
       //ye jab kaam aata hai jab ham data ko fetch krte hai ye us id ko utha kr user ke reference me aata hai aur bolta hai ye social hai to wo social collection me us releated user ko dhoondta hai
      type:mongoose.Schema.Types.ObjectId,
      ref:'Social'
  },
  //I am storing all the id of comments in this post schema itself
  //ye ham isliye bna rhe hai kunki ham chathe hai jis post per ham comment kre bus usi post ki comment hame dikhai de 
  // isliye comment array me ham comment ki sari id store kr le rhe hai 
  comments:[

    {

      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }
  ],
  postAvatar:{
    type:String
  }

},{
    timestamps:true
});

let storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, path.join(__dirname,'..',Post_Path))
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
 
    cb(null, file.fieldname + '-' + uniqueSuffix);
    
  }
});

//jo hamne home.ejs ke form bnat time input type ka name diya tha whi ham single me dete hai
PostSchema.statics.uploadedPost=multer({storage:storage}).single('PostAvatar');



PostSchema.statics.PostAvatarPath=Post_Path;

const Post=mongoose.model('Post',PostSchema);
module.exports=Post;