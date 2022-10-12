import * as mongoose from 'mongoose';
//dealing with promise based apis
export const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            //to avoid any warning in the console
            useNewUrlParser:true,
            UseUnifiedTopology:true
            
        })
        console.log(`MongoDB Connected:${conn.connection.host}`)
    }catch(err){
        console.error(err)

        process.exit(1)
    }
}
