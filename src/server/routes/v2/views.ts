import express from 'express'
import ViewsController from '../../controller/ViewsController'

const router = express.Router()

// /
router.get('/', ViewsController.showViewMain)

// /ubication
router.get('/ubication', ViewsController.showViewUbication)

// /help
router.get('/help', ViewsController.showViewHelp)

// /shopping-cart
router.get('/shopping-cart', ViewsController.showViewShoppingCart)

export default router
