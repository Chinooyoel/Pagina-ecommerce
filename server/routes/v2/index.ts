import express from 'express';

import errorMiddleware from '../../middleware/errores';
import auth from './auth'; 
import users from './users'; 

const app = express();

// app.use('/v2/producto', require('./producto'));
app.use('/v2/login', auth);
app.use('/v2/usuario', users);
// app.use('/v2/pedido', require('./pedido'));
app.use( errorMiddleware );

module.exports=app;