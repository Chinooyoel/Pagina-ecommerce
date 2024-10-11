import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Brand, BrandId } from './brand'
import type { OrderDetail, OrderDetailId } from './orderDetail'
import type { Subcategory, SubcategoryId } from './subcategory'
import type { Supplier, SupplierId } from './supplier'

export interface ProductAttributes {
	productId: number
	name: string
	description?: string
	stock: number
	guarantee: string
	code?: string
	price: number
	cost: number
	image: string
	state: string
	createdAt: Date
	updatedAt: Date
	subcategoryId?: number
	brandId?: number
	supplierId?: number
}

export type ProductPk = 'productId'
export type ProductId = Product[ProductPk]
export type ProductOptionalAttributes =
	| 'productId'
	| 'description'
	| 'code'
	| 'image'
	| 'state'
	| 'createdAt'
	| 'updatedAt'
	| 'subcategoryId'
	| 'brandId'
	| 'supplierId'
export type ProductCreationAttributes = Optional<
	ProductAttributes,
	ProductOptionalAttributes
>

export class Product
	extends Model<ProductAttributes, ProductCreationAttributes>
	implements ProductAttributes
{
	productId!: number
	name!: string
	description?: string
	stock!: number
	guarantee!: string
	code?: string
	price!: number
	cost!: number
	image!: string
	state!: string
	createdAt!: Date
	updatedAt!: Date
	subcategoryId?: number
	brandId?: number
	supplierId?: number

	// Product belongsTo Brand via brandId
	brand!: Brand
	getBrand!: Sequelize.BelongsToGetAssociationMixin<Brand>
	setBrand!: Sequelize.BelongsToSetAssociationMixin<Brand, BrandId>
	createBrand!: Sequelize.BelongsToCreateAssociationMixin<Brand>
	// Product hasMany OrderDetail via productId
	orderDetails!: OrderDetail[]
	getOrderDetails!: Sequelize.HasManyGetAssociationsMixin<OrderDetail>
	setOrderDetails!: Sequelize.HasManySetAssociationsMixin<
		OrderDetail,
		OrderDetailId
	>
	addOrderDetail!: Sequelize.HasManyAddAssociationMixin<
		OrderDetail,
		OrderDetailId
	>
	addOrderDetails!: Sequelize.HasManyAddAssociationsMixin<
		OrderDetail,
		OrderDetailId
	>
	createOrderDetail!: Sequelize.HasManyCreateAssociationMixin<OrderDetail>
	removeOrderDetail!: Sequelize.HasManyRemoveAssociationMixin<
		OrderDetail,
		OrderDetailId
	>
	removeOrderDetails!: Sequelize.HasManyRemoveAssociationsMixin<
		OrderDetail,
		OrderDetailId
	>
	hasOrderDetail!: Sequelize.HasManyHasAssociationMixin<
		OrderDetail,
		OrderDetailId
	>
	hasOrderDetails!: Sequelize.HasManyHasAssociationsMixin<
		OrderDetail,
		OrderDetailId
	>
	countOrderDetails!: Sequelize.HasManyCountAssociationsMixin
	// Product belongsTo Subcategory via subcategoryId
	subcategory!: Subcategory
	getSubcategory!: Sequelize.BelongsToGetAssociationMixin<Subcategory>
	setSubcategory!: Sequelize.BelongsToSetAssociationMixin<
		Subcategory,
		SubcategoryId
	>
	createSubcategory!: Sequelize.BelongsToCreateAssociationMixin<Subcategory>
	// Product belongsTo Supplier via supplierId
	supplier!: Supplier
	getSupplier!: Sequelize.BelongsToGetAssociationMixin<Supplier>
	setSupplier!: Sequelize.BelongsToSetAssociationMixin<Supplier, SupplierId>
	createSupplier!: Sequelize.BelongsToCreateAssociationMixin<Supplier>

	static initModel(sequelize: Sequelize.Sequelize): typeof Product {
		return Product.init(
			{
				productId: {
					autoIncrement: true,
					type: DataTypes.SMALLINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
					field: 'product_id',
				},
				name: {
					type: DataTypes.STRING(200),
					allowNull: false,
				},
				description: {
					type: DataTypes.STRING(1500),
					allowNull: true,
				},
				stock: {
					type: DataTypes.TINYINT.UNSIGNED,
					allowNull: false,
				},
				guarantee: {
					type: DataTypes.STRING(45),
					allowNull: false,
				},
				code: {
					type: DataTypes.STRING(45),
					allowNull: true,
				},
				price: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: false,
				},
				cost: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: false,
				},
				image: {
					type: DataTypes.STRING(100),
					allowNull: false,
					defaultValue: 'no-imagen.jpg',
				},
				state: {
					type: DataTypes.CHAR(1),
					allowNull: false,
					defaultValue: 'A',
				},
				subcategoryId: {
					type: DataTypes.TINYINT,
					allowNull: true,
					references: {
						model: 'subcategory',
						key: 'subcateogory_id',
					},
					field: 'subcategory_id',
				},
				brandId: {
					type: DataTypes.TINYINT,
					allowNull: true,
					references: {
						model: 'brand',
						key: 'brand_id',
					},
					field: 'brand_id',
				},
				supplierId: {
					type: DataTypes.TINYINT,
					allowNull: true,
					references: {
						model: 'supplier',
						key: 'supplier_id',
					},
					field: 'supplier_id',
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
				tableName: 'product',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'product_id' }],
					},
					{
						name: 'subcategoria_id',
						using: 'BTREE',
						fields: [{ name: 'subcategory_id' }],
					},
					{
						name: 'marca_id',
						using: 'BTREE',
						fields: [{ name: 'brand_id' }],
					},
					{
						name: 'proveedor_id',
						using: 'BTREE',
						fields: [{ name: 'supplier_id' }],
					},
				],
			},
		)
	}
}
