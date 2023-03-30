const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/schema');
passport.use(new LocalStrategy({
      //ye syntax hai isme email denge 
     usernameField:'email',
     //flash message widdleware me send krne ke liye req ko true kiya hai
     passReqToCallback:true
    },
     //done inbuilt function hai ye callback funcion hai isme faliure or success bhejte hai 
      function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){

                req.flash('error',err);
                console.log(err);
                 //done two argument leta hai phla error hota hai dosra aur kuch bhi
                 return done(err);
            }

            if(!user||user.password!=password){

                req.flash('error',"invalid password/username");
                //koi error nhi hai isliye null bhej rhe hai aur bta rhe hai aur false kunki login nhi hua
                return done(null,false);
            }
            
            return done(null,user);
        });
          
    }));

    //serilalize user jo uper se done bheja ja rha hai wo iske pass aayega aur ye done bhej dega session ko cookie set krne ke liye
    passport.serializeUser(function(user,done){

           return done(null,user.id);

    });
    //passport deserialized user ye jo id serialize user ne session me rkha hai us id ka use krega 
    passport.deserializeUser(function(id,done){

         User.findById(id,function(err,user){

            if(err){
                console.log(err);
                return done(err);
            }
        //flow of the code will be maintain
             return done(null,user);
         });

    }) ;

  // is function ka use mai is liye kr rha hoo kunki koi bhi profile ko khol sakta hai mai chatha hoo wahi khole jo login ho to mai is function ko wha per dal doonga jha per profile call ho rha hai
      passport.checkAuthentication=(req,res,next)=>{
        //isAuthentiacted jo hai wo passport ka function hai jo btata hai ki user login hai ki nhi 
        if(req.isAuthenticated()){
              //console.log('hii');
            return next();
        }
       return  res.redirect('/user/signin');
      }

      passport.setAuthe=(req,res,next)=>{
       
        if(req.isAuthenticated()){
            
            res.locals.user=req.user
            //console.log(res.locals.user);
         
        }
         return next();
      
      }
       
     
      //setAuthentication funcation ka use ham isliye krte hai ki jo user login hai usko locals me dal denge jo help krega hmari ejs me page ko send krne ke liye
      // is function ko index me dal do aur use krne ke liye bol do kunki ye khi per call nhi ho rha hai index.js jab is per aayega to ise call krdega 
      
    module.exports=passport;




    // Contact.findByIdAndDelete(id)
    //  .then(function(deletesuccess){
    //   console.log('complete delete',deletesuccess)
    //   res.redirect('back')
    //  })
    //  .catch(function(err){
    //   console.log('err', err);
    //   res.status(500).send('Error creating contact');
    //  })