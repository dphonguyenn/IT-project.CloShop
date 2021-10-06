const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { extname } = require('path');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./src/routes');
const db = require('./src/config/db');
// chuyen doi method
const methodOverride = require('method-override');
const dotenv = require('dotenv');
// const URI = process.env.DATABASE_URL;
// * use dotenv
dotenv.config();

// * Connect db
db.connect();

// * Thao tac voi cac file tinh
app.use(express.static(path.join(__dirname, 'src/Public')));

// * add middleware de nhan du lieu
app.use(
    express.urlencoded({
        extended: true,
    }),
); 
app.use(express.json());

// * use methodOverride
app.use(methodOverride('_method'));

// * HTTP logger
app.use(morgan('combined'))

// * Template engine
app.engine(
    'hbs',
handlebars({
    extname: '.hbs',
    helpers: {
        // cau hinh cac ham cho handlebars
        sum:(a,b)=>a+b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'src', 'resources', 'views'));

// * Routes init
route(app);

// * Access port
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});