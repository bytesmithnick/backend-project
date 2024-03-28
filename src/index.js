// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import app from './app.js';
import connectDB from "./db/index.db.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 2000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=> {
    console.log('MONGO DB Connection failed !!! ', err);
})




// FIRST APPROCH (PROFFESSIONAL)

// import express from 'express'
// const app = express()

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on('error', (error) => {
//             console.log('ERROR: ', error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listning on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error('ERROR: ', error)
//         throw err
//     }
// })()