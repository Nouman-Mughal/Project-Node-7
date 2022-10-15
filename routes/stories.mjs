
import {default as express} from 'express';
import {ensureAuth} from '../middleware/auth.mjs';
import {Story} from '../models/model.mjs';
const storyrouter=express.Router()
//@description Login/landing page
//@ actual route GET /
storyrouter.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add')
    
    //importtant::will get erro if /stories/add used.
})
storyrouter.post('/',ensureAuth,async(req,res)=>{
    try {
        req.body.user=req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        
        console.error(err)
        res.render('error/500')
    }
    //importtant::will get erro if /stories/add used.
})

//@description show all stories
//@ actual route GET /
storyrouter.get('/',ensureAuth,async (req,res)=>{
    try {
        const stories=await Story.find({status:'public'})
        .populate('user')
        .sort({createAt:'desc'})
        .lean()
        res.render('stories/index',{stories})
    } catch (err) {
        console.error(object)
        res.render('error/500')
    }
    
    //importtant::will get erro if /stories/add used.
})

export default storyrouter;
