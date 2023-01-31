import express from 'express';

import { verificarAdminRole, verificarRole } from '../../middleware/autenticacion';
import ProductsController from '../../modules/products/ProductsController';
import { validarProducto } from '../../middleware/validaciones';

const router = express.Router();

//Renderiza la vista con el perfil del producto 
// /producto/perfil/:id
router.get('/:id', ProductsController.findById);

//devuelve los productos buscados por palabras en formato JSON
// /producto/admin/buscar/:palabra
router.get('/word/:palabra', verificarRole, ProductsController.findByWord);

//Renderiza las vista con productos buscados por filtros
// /producto/buscar/palabra=:palabra/idcat=:idcat/idsub=:idsub/idmarca=:idmarca/orden=:orden/
router.get('/filters', ProductsController.findWithFilters);

//Borra un producto por id
// /producto/borrar/:id
router.get('/delete/:id', verificarAdminRole, ProductsController.delete);

//Crea un producto
// /producto/crear
router.post('/create', [verificarAdminRole] , ProductsController.create);

//Actualiza un producto
// /producto/actualizar/:id
router.post('/update/:id', [verificarAdminRole], ProductsController.create);

//Sube una imagen del producto y actualiza el producto
// /producto/upload/:id
// router.post('/upload/:id', verificarAdminRole,  subirImagenDelProducto);



export default router;




