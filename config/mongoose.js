const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/ALI');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error'));
db.once('open',function(){

    console.log('Success');
});