import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Product, ProductId } from './product'

export interface BrandAttributes {
	brandId: number
	name: string
	createdAt: Date
	updatedAt: Date
}

export type BrandPk = 'brandId'
export type BrandId = Brand[BrandPk]
export type BrandOptionalAttributes = 'brandId' | 'createdAt' | 'updatedAt'
export type BrandCreationAttributes = Optional<
	BrandAttributes,
	BrandOptionalAttributes
>

export class Brand
	extends Model<BrandAttributes, BrandCreationAttributes>
	implements BrandAttributes
{
	brandId!: number
	name!: string
	createdAt!: Date
	updatedAt!: Date

	// Brand hasMany Product via brandId
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

	static initModel(sequelize: Sequelize.Sequelize): typeof Brand {
		return Brand.init(
			{
				brandId: {
					autoIncrement: true,
					type: DataTypes.TINYINT,
					allowNull: false,
					primaryKey: true,
					field: 'brand_id',
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
				tableName: 'brand',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'brand_id' }],
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
