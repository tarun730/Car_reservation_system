const express=require('express')
const router =express.Router()
const passport =require("passport")
const passportLocal = require( "../config/passport");
const controller= require('../controller/addcontroller')

// initPassportLocal()

router.post('/create',controller.create)
router.post('/create_session', passport.authenticate('local-login',{failureRedirect:'/'}),controller.create_session);
router.post('/car_register',passport.checkAuthentication,controller.car_register)
router.get('/history',passport.checkAuthentication,controller.history)
router.post('/admin',passport.authenticate('local-admin',{failureRedirect:'/'}),controller.admin)


router.get('/ejs',passport.checkAuthentication,controller.ejs)



router.get('/registred_Users',controller.registred_Users)
router.get('/registered_car',controller.registered_car)
router.get('/delete_car/:id',controller.delete_car)

router.get('/logout',controller.logout)

module.exports=router