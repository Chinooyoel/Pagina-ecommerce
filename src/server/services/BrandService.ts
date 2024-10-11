import { BrandAttributes } from '../models/brand'
import BrandRepository from '../repository/BrandRepository'

export default class BrandService {
	static async findAll(filters?: Partial<BrandAttributes>) {
		return await BrandRepository.findAll(filters)
	}
}
