
import * as express from 'express';
const router=express.Router()
//@description Login/landing page
//@ actual route GET /
router.get('/',(req,res)=>{
    res.render('login')
})
//@description /dashboard
//@ actual route GET /dashboard

router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

export default router;
