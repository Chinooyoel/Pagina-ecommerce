import express from 'express';

import errorMiddleware from '../../middleware/errores';
import auth from './auth'; 
import users from './users'; 
import products from './products'; 

const app = express();

app.use('/api/v2/login', auth);
app.use('/api/v2/product', products);
app.use('/api/v2/user', users);
// app.use('/v2/pedido', require('./pedido'));
app.use( errorMiddleware );

module.exports=app;