import express from 'express'

import ProductsController from '../../controller/ProductsController'

const router = express.Router()

//Renderiza la vista con el perfil del producto
// /product/:id
router.get('/profile/:id', ProductsController.showViewProductDetail)

//Renderiza la vista con el perfil del producto
// /product/table
router.get('/table', ProductsController.showViewProductsTable)

// /product/create
router.get('/create', ProductsController.showViewcreate)

// /product/edit/:id
router.get('/edit/:id', ProductsController.showViewEditProduct)

//Borra un producto por id
// /product/delete/:id
router.get('/delete/:id', ProductsController.deleteProduct)

//devuelve los productos buscados por palabras en formato JSON
// /product/word/:palabra
router.get('/word/:palabra', ProductsController.findProductByWord)

//Renderiza las vista con productos buscados por filtros
// /filters?wordFilter=:wordFilter&categoryFilter=:categoryId&subcategoryFilter=:subcategoryId&brandFilter=:brandId&order=:order
router.get('/filters', ProductsController.findProductWithFilters)

//Crea un producto
// /product/create
router.post('/', ProductsController.create)

// /product/update/:id
router.post('/:id', ProductsController.updateById)

//Sube una imagen del producto y actualiza el producto
// /producto/upload/:id
// router.post('/upload/:id', verificarAdminRole,  subirImagenDelProducto);

export default router
