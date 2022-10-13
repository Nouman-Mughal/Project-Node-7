
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
//@description logout user
//router /auth/logout
// authrouter.get('/logout',(req,res)=>{
//     //due to passport middleware once we have login middleware we also have logout method
//     req.logout()
//     res.redirect('/')
// })
//req.logout has benn modified to be asyncronous so callback works in this method only.
authrouter.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

export default authrouter;
