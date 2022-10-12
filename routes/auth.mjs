
import passport from 'passport';
import {default as express} from 'express';
const authrouter=express.Router()
//@description auth with google
//@ actual route GET /
authrouter.get('/google',passport.authenticate('google',{
    scope:["profile"]
}))
//@description google auth callback
//@ actual route GET /auth/google/callback

authrouter.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),
(req,res)=>{
    res.redirect('/dashboard')
}
)

export default authrouter;
