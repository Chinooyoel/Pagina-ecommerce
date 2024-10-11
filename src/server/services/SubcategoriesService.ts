import SubcategoriesRepository from '../repository/SubcategoriesRepository'
import { SubcategoryAttributes } from '../models/subcategory'

export default class SubcategoriesService {
	static async findAll(filters?: Partial<SubcategoryAttributes>) {
		return await SubcategoriesRepository.findAll(filters)
	}
}
