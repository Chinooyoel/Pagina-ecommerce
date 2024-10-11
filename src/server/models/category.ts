import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Subcategory, SubcategoryId } from './subcategory'

export interface CategoryAttributes {
	categoryId: number
	name: string
	createdAt: Date
	updatedAt: Date
}

export type CategoryPk = 'categoryId'
export type CategoryId = Category[CategoryPk]
export type CategoryOptionalAttributes =
	| 'categoryId'
	| 'createdAt'
	| 'updatedAt'
export type CategoryCreationAttributes = Optional<
	CategoryAttributes,
	CategoryOptionalAttributes
>

export class Category
	extends Model<CategoryAttributes, CategoryCreationAttributes>
	implements CategoryAttributes
{
	categoryId!: number
	name!: string
	createdAt!: Date
	updatedAt!: Date

	// Category hasMany Subcategory via categoryId
	subcategories!: Subcategory[]
	getSubcategories!: Sequelize.HasManyGetAssociationsMixin<Subcategory>
	setSubcategories!: Sequelize.HasManySetAssociationsMixin<
		Subcategory,
		SubcategoryId
	>
	addSubcategory!: Sequelize.HasManyAddAssociationMixin<
		Subcategory,
		SubcategoryId
	>
	addSubcategories!: Sequelize.HasManyAddAssociationsMixin<
		Subcategory,
		SubcategoryId
	>
	createSubcategory!: Sequelize.HasManyCreateAssociationMixin<Subcategory>
	removeSubcategory!: Sequelize.HasManyRemoveAssociationMixin<
		Subcategory,
		SubcategoryId
	>
	removeSubcategories!: Sequelize.HasManyRemoveAssociationsMixin<
		Subcategory,
		SubcategoryId
	>
	hasSubcategory!: Sequelize.HasManyHasAssociationMixin<
		Subcategory,
		SubcategoryId
	>
	hasSubcategories!: Sequelize.HasManyHasAssociationsMixin<
		Subcategory,
		SubcategoryId
	>
	countSubcategories!: Sequelize.HasManyCountAssociationsMixin

	static initModel(sequelize: Sequelize.Sequelize): typeof Category {
		return Category.init(
			{
				categoryId: {
					autoIncrement: true,
					type: DataTypes.TINYINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
					field: 'category_id',
				},
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: 'nombre',
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
				tableName: 'category',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'category_id' }],
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
