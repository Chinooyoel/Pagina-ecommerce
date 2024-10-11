import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Category, CategoryId } from './category'
import type { Product, ProductId } from './product'

export interface SubcategoryAttributes {
	subcategoryId: number
	name: string
	createdAt: Date
	updatedAt: Date
	categoryId?: number
}

export type SubcategoryPk = 'subcategoryId'
export type SubcategoryId = Subcategory[SubcategoryPk]
export type SubcategoryOptionalAttributes =
	| 'subcategoryId'
	| 'createdAt'
	| 'updatedAt'
	| 'categoryId'
export type SubcategoryCreationAttributes = Optional<
	SubcategoryAttributes,
	SubcategoryOptionalAttributes
>

export class Subcategory
	extends Model<SubcategoryAttributes, SubcategoryCreationAttributes>
	implements SubcategoryAttributes
{
	subcategoryId!: number
	name!: string
	createdAt!: Date
	updatedAt!: Date
	categoryId?: number

	// Subcategory belongsTo Category via categoryId
	category!: Category
	getCategory!: Sequelize.BelongsToGetAssociationMixin<Category>
	setCategory!: Sequelize.BelongsToSetAssociationMixin<Category, CategoryId>
	createCategory!: Sequelize.BelongsToCreateAssociationMixin<Category>
	// Subcategory hasMany Product via subcategoryId
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

	static initModel(sequelize: Sequelize.Sequelize): typeof Subcategory {
		return Subcategory.init(
			{
				subcategoryId: {
					autoIncrement: true,
					type: DataTypes.TINYINT,
					allowNull: false,
					primaryKey: true,
					field: 'subcategory_id',
				},
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: 'name',
				},
				categoryId: {
					type: DataTypes.TINYINT.UNSIGNED,
					allowNull: true,
					references: {
						model: 'category',
						key: 'product_id',
					},
					field: 'category_id',
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
				tableName: 'subcategory',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'subcategory_id' }],
					},
					{
						name: 'nombre',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'name' }],
					},
					{
						name: 'categoria_id',
						using: 'BTREE',
						fields: [{ name: 'category_id' }],
					},
				],
			},
		)
	}
}
