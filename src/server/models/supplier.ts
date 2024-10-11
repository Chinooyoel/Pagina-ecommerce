import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Product, ProductId } from './product'

export interface SupplierAttributes {
	supplierId: number
	name: string
	createdAt: Date
	updatedAt: Date
}

export type SupplierPk = 'supplierId'
export type SupplierId = Supplier[SupplierPk]
export type SupplierOptionalAttributes =
	| 'supplierId'
	| 'createdAt'
	| 'updatedAt'
export type SupplierCreationAttributes = Optional<
	SupplierAttributes,
	SupplierOptionalAttributes
>

export class Supplier
	extends Model<SupplierAttributes, SupplierCreationAttributes>
	implements SupplierAttributes
{
	supplierId!: number
	name!: string
	createdAt!: Date
	updatedAt!: Date

	// Supplier hasMany Product via supplierId
	products!: Product[]
	getProducts!: Sequelize.HasManyGetAssociationsMixin<Product>
	setProducts!: Sequelize.HasManySetAssociationsMixin<Product, ProductId>
	addProduct!: Sequelize.HasManyAddAssociationMixin<Product, ProductId>
	addProducts!: Sequelize.HasManyAddAssociationsMixin<Product, ProductId>
	create!: Sequelize.HasManyCreateAssociationMixin<Product>
	removeProduct!: Sequelize.HasManyRemoveAssociationMixin<Product, ProductId>
	removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<Product, ProductId>
	hasProduct!: Sequelize.HasManyHasAssociationMixin<Product, ProductId>
	hasProducts!: Sequelize.HasManyHasAssociationsMixin<Product, ProductId>
	countProducts!: Sequelize.HasManyCountAssociationsMixin

	static initModel(sequelize: Sequelize.Sequelize): typeof Supplier {
		return Supplier.init(
			{
				supplierId: {
					autoIncrement: true,
					type: DataTypes.TINYINT,
					allowNull: false,
					primaryKey: true,
					field: 'supplier_id',
				},
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: 'name',
				},
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: 'supplier',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'supplier_id' }],
					},
					{
						name: 'nombre',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'name' }],
					},
				],
			},
		)
	}
}
