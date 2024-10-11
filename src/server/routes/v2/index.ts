import express from 'express'

import errorMiddleware from '../../middleware/errors'
import auth from './auth'
import users from './users'
import products from './products'
import views from './views'

const router = express.Router()

router.use('/login', auth)
router.use('/product', products)
router.use('/user', users)
router.use('/', views)
// router.use('/v2/pedido', require('./pedido'));
// router.use(errorMiddleware)

export default router
