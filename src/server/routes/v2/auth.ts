import express from 'express'

import AuthController from '../../controller/authController'

const router = express.Router()

// /login
router.get('/', AuthController.showViewLogin)

// /login
router.post('/', AuthController.login)

export default router
