const express=require('express');

const port=8000;
const app=express();
const db=require('./config/mongoose');


// path.join krke koi ejs chlana ho to iska use krte hai
const path=require('path');


//iska use ham cookie ko set krne ke liye krte hai isme cookie encrypted form me store hogii
const session=require('express-session');

//passport ko initiliaze krna hai krna hai jha per bhi passport ka use hoga 
//dosra local strategy ko use kr liya
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//connect mongo ka istemal ham cookie ko db me dtore krne ke liye krte ki jab bhi ham server dobra se chlaya se to hm logout na ho jaye 
const connectMongo=require('connect-mongo');
//Flash message ki library ko require kr rhe hai
//flash messages  session cookie me store hote hai 
const flash=require('connect-flash');
//flash ke middleware ko require kr rhe hai 

const customMware=require('./config/middleware');
//form data jo bhi aata hai use parse krne ke liye is middleware ka use krte hai

//ejs-layouts ko require krenge
const expressLayouts=require('express-ejs-layouts');

app.use(express.urlencoded());



// ejs use kr rhe hai ye btate hai
app.set('view engine','ejs');

// jab bhi koi render krta hai ejs page ko ye help krta hai
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, './assets')));

//abb ham session ka use krenge 
app.use(session({

   name:'Social',
   //ye ham use krenge production me
   secret:'blabla',
   saveUninitialized:false,
   resave:false,
   store: connectMongo.create({ 
    mongoUrl: 'mongodb://127.0.0.1:27017/ALI'}),
   //cookie ko age denge uske badd cookie expire ho jayegii
   cookie:{
       maxAge:(1000*60*100)

   }
  

}));
    //abb ham btayenge ki ham passport use kr rhe hai 
    app.use(passport.initialize());

    //passport help kr rha hai session bnane ki isliye ham bol rhe hai passport.session
    app.use(passport.session());
   
   
   

    //is funcation ka use ham yha isliye kr rhe hai kunki ye khi per call nhi ho rha hai jab bhi index.js chlega to ye apne app use ho jayega
    app.use(passport.setAuthe);


    
     //flash ko mai use kr rha ho wo mujhe btana pdega
    //flash message session cookie me store hote hai isliye session ke bad is likhna hai 
    app.use(flash());


     //flash middleware ko store kr rhe hai 
   app.use(customMware.setFlash);

   //aap ko bta rhe hai ke ham ejs layouts use kr rhe hai

   
   app.use(expressLayouts);


   //ham bta rhe hai ki photo upload krne ke liye ham konsa folder use kr rhe hai
    //iska matlab hai ki jab bhi /uploads ki bat ho browser me to use is path se join krdo ....
   app.use('/uploads',express.static(path.join(__dirname,'/uploads')));





     app.use('/PostUploads',express.static(path.join(__dirname,'/PostUploads')));




  
// routes use kr rhe hai jab bhi locahost:8000/ per req pdegi to index.js routes chlega aur jab localhost:8000/user per tab user.js routes chlega
 app.use('/',require('./routes/index'));
// ye function btata hai ki tumne jo server bnya hai wo sahi chl rha hai
app.listen(port,function(err){

    if(err)
    {
        console.log(err);
    }
    console.log('Server is Running',port);


});



