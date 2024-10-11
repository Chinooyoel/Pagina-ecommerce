import CategoriesRepository from '../repository/CategoriesRepository'
import { CategoryAttributes } from '../models/category'

export default class CategoriesService {
	static async findAll(filters?: Partial<CategoryAttributes>) {
		return await CategoriesRepository.findAll(filters)
	}
}
