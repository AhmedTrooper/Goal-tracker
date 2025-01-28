//import node_modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

//setup application
const app = express();


//setup middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
dotenv.config();




//setup required constant
const url = process.env.MONGODB_URL;
const PORT =  process.env.PORT;










//setup authentication


//connect to database and start server
mongoose.connect(url).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server  started on port ${PORT}`);
    });
}).catch(err => {
    console.log(err);
})

//import routes
const goal_list_get = require('./api/goal_list_get');
const goal_create_post = require('./routes/goal_create_post');
const goal_delete_post = require('./routes/goal_delete_post');
const goal_discard_post = require('./routes/goal_discard_post');
const goal_finish_patch = require('./routes/goal_finish_patch');
const goal_details_get = require('./api/goal_details_get');


//assign routes
app.use("/", goal_create_post);

//api list
app.use("/api", goal_list_get);
app.use("/api", goal_details_get);
//general routes
app.use("/", goal_delete_post);
app.use("/", goal_discard_post);
app.use("/", goal_finish_patch);

