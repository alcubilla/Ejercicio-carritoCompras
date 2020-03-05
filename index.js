import http from 'http';
import express from 'express';
import Data from './online_store/products'
import productsRoutes from './online_store/productsRoutes'
import adminRoutes from './online_store/adminRoutes'

const store = { total: 0};  //variable glogal para total ventas

const APP = express();
APP.use(express.json()); //para usar el body
const PRODUCTS = express();
const ADMIN = express();

const SERVER = http.createServer(APP);



APP.use('/products', PRODUCTS);
APP.use('/admin', ADMIN);

APP.set('views', './views');
APP.set('view engine', 'pug');



productsRoutes(PRODUCTS, Data, store);

adminRoutes(ADMIN, Data,store);

SERVER.listen(5000);