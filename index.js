

const express=require('express')
const app=express()
const port=3000
const cookiesParser=require('cookie-parser')
// const path= require('path')
const session =require('express-session')
const passport= require("passport");
const passportLocal = require("./config/passport");


app.use(express.urlencoded({extended:true}));

app.use(cookiesParser())



// const staticpath=path.join(__dirname,'../public/index.html')

app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views','./views')

passportLocal(passport)

app.use(session({
    name:"car_reservation",
    secret:'bhalbhall',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1800000 )
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)
// require('./path/to/passport/config/file')(passport)
app.use('/',require('./router')) 

app.listen(port,(err)=>{
if(err){
    console.log("erroe in server")
}
console.log("connected successfully..")
})