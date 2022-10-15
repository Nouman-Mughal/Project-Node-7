
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {default as passport} from 'passport';
import * as mongoose from 'mongoose';
import passportConfig from './config/passport.mjs';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import {connectDB} from './config/db.mjs';
import * as dotenv from 'dotenv';
import morgan  from 'morgan';
import router from './routes/index.mjs';
import authrouter from './routes/auth.mjs'
import {engine} from 'express-handlebars';
import storyrouter from './routes/stories.mjs';
import bodyParser from 'body-parser';


//Load config
dotenv.config({path: './config/config.env'})
passportConfig(passport)
const app=express();
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())//used to get body object from request
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
    
}
//static folder
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,'public')))
//handlebars
app.engine('.hbs',engine({ defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

connectDB()
//sessions
// const MongoStore = connectMongo(session);
//to store the session in the database
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI ,
        touchAfter: 24 * 3600 // time period in seconds
    // cookie: { secure: true } not gonna work with http only works with https.
  })}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/',router)
app.use('/auth',authrouter)
app.use('/stories',storyrouter)
const PORT=process.env.PORT || 5000 ;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))