import { Op } from 'sequelize';
import Categorias = require('../../models/Categorias');
import Marcas = require('../../models/Marcas');
import Productos = require('../../models/Productos');
import Proveedores = require('../../models/Proveedores');
import Subcategorias = require('../../models/Subcategorias');
import {Filters, ProductDTO, ProductFull, ProductSubcategory} from './ProductDTO';

export default class ProductsRepository {
	static async findById(id: number): Promise<ProductFull[]>{
		return await Productos.findOne({
			where: {
				idproducto: id,
			},
			include: [
				Marcas, 
				Proveedores, 
				{
					model: Subcategorias,
					include: [Categorias]
				}],
		});
	}

	static async findByWord(word: string): Promise<ProductSubcategory[]>{
		return await Productos.findAll({
			where: {
				nombre: {
					[Op.substring]: word,
				},
			},
			include:{
				model: Subcategorias
			}
		});
	}

	static async findWithFilters(filters: Filters): Promise<ProductSubcategory[]>{
		let filtersDB = {};
		let categoryFilter = {};
		let priceOrder : any[]= [];
	

		//si el filtro es diferente de -1 quiere decir que el usuario eligio un filtro
		//por lo tanto se agrega al objeto filtros
		/*
		Ejemplo1: el usuario quiere ver los productos que sean de la marca con id 2,
		la marcaFiltro va a ser 2, marcaFiltro es diferente de -1 por lo tanto se agrega a filtros
	
		Ejemplo2: el usuario quiere ver los productos de todas las marcas, 
		la marcaFiltro va a ser -1, por lo tanto no se agrega nada a filtros
	  */
	
		if (filters.palabraFiltro) {
			filtersDB = { nombre: { [Op.substring]: filters.palabraFiltro } };
		}
		if (filters.subcategoriaFiltro) {
			filtersDB = { ...filtersDB, subcategoria_id: filters.subcategoriaFiltro };
		}
		if (filters.marcaFiltro) {
			filtersDB = { ...filtersDB, marca_id: filters.marcaFiltro };
		}
		//para filtrar adentro del model de productos
		if (filters.categoriaFiltro) {
			categoryFilter = { categoria_id: filters.categoriaFiltro };
		}
		if (filters.orden) {
			priceOrder = [['precio', filters.orden]];
		}
		return await Productos.findAll({
			//agregamos los filtros de marca, subcategoria y palabra
			where: {...filtersDB, estado : 'A' },
			order: priceOrder,
			include: [
				{
					model: Subcategorias,
					//agregamos el filtro de categoria
					where: categoryFilter,
					attributes: [],
				},
			],
		});
	}

	static async create( product: ProductDTO ) {
		const productDB = new Productos(product);
		return productDB.save();
	}

	static async update(id: number, product: ProductDTO) {
		return await Productos.update(product, { where: { idproduct: id } });
	}

	static async softDelete(id: number) {
		await Productos.destroy( { where: { idproducto: id } });
	}
}