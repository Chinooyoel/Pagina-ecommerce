import { Brand, BrandAttributes } from '../models/init-models'

export default class BrandRepository {
	static async findAll(
		filters?: Partial<BrandAttributes>,
	): Promise<BrandAttributes[]> {
		return await Brand.findAll({ where: filters, raw: true, nest: true })
	}
}
