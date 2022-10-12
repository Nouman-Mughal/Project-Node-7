
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


import {connectDB} from './config/db.mjs';
import * as dotenv from 'dotenv';
import morgan  from 'morgan';

import router from './routes/index.mjs';
import {engine} from 'express-handlebars';

//Load config
dotenv.config({path: './config/config.env'})
const app=express();
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
app.use('/',router)
const PORT=process.env.PORT || 5000 ;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))