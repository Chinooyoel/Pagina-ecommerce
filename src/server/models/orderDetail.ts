import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Order, OrderId } from './order'
import type { Product, ProductId } from './product'

export interface OrderDetailAttributes {
	orderDetailId: number
	unitPrice: number
	quantity: number
	createdAt: Date
	updatedAt: Date
	productId?: number
	orderId?: number
}

export type OrderDetailPk = 'orderDetailId'
export type OrderDetailId = OrderDetail[OrderDetailPk]
export type OrderDetailOptionalAttributes =
	| 'orderDetailId'
	| 'createdAt'
	| 'updatedAt'
	| 'productId'
	| 'orderId'
export type OrderDetailCreationAttributes = Optional<
	OrderDetailAttributes,
	OrderDetailOptionalAttributes
>

export class OrderDetail
	extends Model<OrderDetailAttributes, OrderDetailCreationAttributes>
	implements OrderDetailAttributes
{
	orderDetailId!: number
	unitPrice!: number
	quantity!: number
	createdAt!: Date
	updatedAt!: Date
	productId?: number
	orderId?: number

	// OrderDetail belongsTo Order via orderId
	order!: Order
	getOrder!: Sequelize.BelongsToGetAssociationMixin<Order>
	setOrder!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>
	createOrder!: Sequelize.BelongsToCreateAssociationMixin<Order>
	// OrderDetail belongsTo Product via productId
	product!: Product
	getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>
	setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>
	create!: Sequelize.BelongsToCreateAssociationMixin<Product>

	static initModel(sequelize: Sequelize.Sequelize): typeof OrderDetail {
		return OrderDetail.init(
			{
				orderDetailId: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					field: 'order_detail_id',
				},
				unitPrice: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: false,
					field: 'unit_price',
				},
				quantity: {
					type: DataTypes.TINYINT,
					allowNull: false,
				},
				productId: {
					type: DataTypes.SMALLINT.UNSIGNED,
					allowNull: true,
					references: {
						model: 'product',
						key: 'product_id',
					},
					field: 'product_id',
				},
				orderId: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: 'order',
						key: 'order_id',
					},
					field: 'order_id',
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
				tableName: 'order_detail',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'order_detail_id' }],
					},
					{
						name: 'producto_id',
						using: 'BTREE',
						fields: [{ name: 'product_id' }],
					},
					{
						name: 'pedido_id',
						using: 'BTREE',
						fields: [{ name: 'order_id' }],
					},
				],
			},
		)
	}
}
