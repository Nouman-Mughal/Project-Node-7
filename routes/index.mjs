
import {default as express} from 'express';
import {ensureAuth,ensureGuest} from '../middleware/auth.mjs';
const router=express.Router()
//@description Login/landing page
//@ actual route GET /
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{layout:'login'})
})
//@description /dashboard
//@ actual route GET /dashboard

router.get('/dashboard',ensureAuth,(req,res)=>{
    
    res.render('dashboard')
})

export default router;
