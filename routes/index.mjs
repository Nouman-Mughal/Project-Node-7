
import {default as express} from 'express';
import {ensureAuth,ensureGuest} from '../middleware/auth.mjs';
import {Story} from '../models/model.mjs';
const router=express.Router()
//@description Login/landing page
//@ actual route GET /
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{layout:'login'})
})
//@description /dashboard
//@ actual route GET /dashboard

router.get('/dashboard',ensureAuth,async (req,res)=>{


    try {
        const stories=await Story.find({user:req.user.id}).lean()
        res.render('dashboard',{
            name:req.user.firstName,
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }


    
   
})

export default router;
