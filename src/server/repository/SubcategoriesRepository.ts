import { Subcategory, SubcategoryAttributes } from '../models/init-models'

export default class SubcategoriesRepository {
	static async findAll(
		filters?: Partial<SubcategoryAttributes>,
	): Promise<SubcategoryAttributes[]> {
		return await Subcategory.findAll({
			where: filters,
			raw: true,
			nest: true,
		})
	}
}
