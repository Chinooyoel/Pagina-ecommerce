import express from 'express'

import UsersController from '../../controller/UsersController'

const router = express.Router()

// /user/search/:data
router.get('/search/:data', UsersController.findUsersByEmail)

// /user/sign-in
router.get('/sign-in', UsersController.showViewSignIn)

// /user/table
router.get('/table', UsersController.showViewUsersTable)

// /user/:id
router.get('/profile/:id', UsersController.showViewUserProfile)

// /user/create-seller
router.get('/create-seller', UsersController.showViewCreateSeller)

// /user/create
router.post('/create', UsersController.createUser)

// /user/update/:id
router.post('/update/:id', UsersController.updateUser)

// /user/update/:id
router.post('/update-role/:id', UsersController.updateUserRole)

export default router
