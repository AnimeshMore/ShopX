const app = require("./app");
const connectDatabase = require('./config/database')

//const dotenv = require('dotenv');

const cloudinary = require('cloudinary')

//Handle uncaught exceptions
process.on('uncaughtException', err =>{
    console.log('ERROR:', err.stack);
    console.log('Shutting down the server due to uncaught exceptions');
    process.exit(1);
})


if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path:"backend/config/config.env"});

//dotenv.config({path:"backend/config/config.env"});


connectDatabase();

/*const server = app.listen(process.env.PORT, () =>{
    console.log('Server started on PORT:', process.env.PORT ,'in', process.env.NODE_ENV ,'mode.');
});*/

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Setting up cloudinary

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

//Handle Unhadled promise rejections
process.on('unhandledRejection', err=>{
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejections");
    server.close(()=>{
        process.exit(1)
    });
})