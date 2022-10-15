import mongoose from 'mongoose'
const StorySchema=new mongoose.Schema({
    title:{
        type:String,
        
    },
    body:{
        type:String,
        
    },
    status:{
        type:String,
        default:"public",
        enum:["public","private"]           //possible outcome.

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"                    //to connect with user model
    },
   
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export const Story= mongoose.model('Story',StorySchema)