import { Supplier, SupplierAttributes } from '../models/init-models'

export default class SuppliersRepository {
	static async findAll(
		filters?: Partial<SupplierAttributes>,
	): Promise<SupplierAttributes[]> {
		return await Supplier.findAll({
			where: filters,
			raw: true,
			nest: true,
		})
	}
}
