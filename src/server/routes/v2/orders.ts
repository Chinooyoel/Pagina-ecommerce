import express from 'express'

import OrdersController from '../../controller/OrdersController'

const router = express.Router()

// /order/:id
router.get('/:id', OrdersController.showViewOrder)

// /order/
router.post('/', OrdersController.createOrder)

export default router
