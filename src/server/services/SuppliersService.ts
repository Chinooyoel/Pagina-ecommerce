import SuppliersRepository from '../repository/SuppliersRepository'
import { SupplierAttributes } from '../models/supplier'

export default class SuppliersService {
	static async findAll(filters?: Partial<SupplierAttributes>) {
		return await SuppliersRepository.findAll(filters)
	}
}
