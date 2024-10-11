import { Category, CategoryAttributes } from '../models/init-models'

export default class CategoriesRepository {
	static async findAll(
		filters?: Partial<CategoryAttributes>,
	): Promise<CategoryAttributes[]> {
		return await Category.findAll({
			where: filters,
			raw: true,
			nest: true,
		})
	}
}
