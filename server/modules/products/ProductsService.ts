import ProductsRepository from './ProductsRepository';
import HTTPResponseError from '../../utils/httpReponseError';
import { HTTP_CODE } from '../../utils/const';
import { Filters, ProductDTO } from './ProductDTO';

export default class ProductsService {
	static async findById (id: number) {
		return await ProductsRepository.findById(id);
	}

	static async findByWord ( word: string ) {
		//guardamos el usuario en la DB
		return await ProductsRepository.findByWord(word);
	}
    
	static async findWithFilters (filters: Filters) {
		//buscamos los usuarios que tengan la palabra en el email
		return await ProductsRepository.findWithFilters(filters);
	}

	static async update ( id: number, product: ProductDTO ) {
		//buscamos el producto por id
		const productFound = await ProductsRepository.findById(id);
			
		// chequiamos si existe el producto
		if (!productFound) throw new HTTPResponseError(HTTP_CODE.NotFound, 'Not Found');

		return await ProductsRepository.update(id, product);
	}

	static async create ( product: ProductDTO ) {
		return await ProductsRepository.create(product);
	}

	static async softDelete ( id: number ): Promise<void> {
		//buscamos el producto por id
		const product = await ProductsRepository.findById(id);
			
		// chequiamos si existe el producto
		if (!product) throw new HTTPResponseError(HTTP_CODE.NotFound, 'Not Found');

		//borramos el producto
		await ProductsRepository.softDelete(id);
	}
}

