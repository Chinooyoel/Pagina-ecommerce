import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { OrderDetail, OrderDetailId } from './orderDetail'
import type { State, StateId } from './state'
import type { User, UserId } from './user'

export interface OrderAttributes {
	orderId: number
	total?: number
	dateYymmdd: string
	createdAt: Date
	updatedAt: Date
	stateId?: number
	userId?: number
}

export type OrderPk = 'orderId'
export type OrderId = Order[OrderPk]
export type OrderOptionalAttributes =
	| 'orderId'
	| 'total'
	| 'createdAt'
	| 'updatedAt'
	| 'stateId'
	| 'userId'
export type OrderCreationAttributes = Optional<
	OrderAttributes,
	OrderOptionalAttributes
>

export class Order
	extends Model<OrderAttributes, OrderCreationAttributes>
	implements OrderAttributes
{
	orderId!: number
	total?: number
	dateYymmdd!: string
	createdAt!: Date
	updatedAt!: Date
	stateId?: number
	userId?: number

	// Order hasMany OrderDetail via orderId
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
	// Order belongsTo State via stateId
	state!: State
	getState!: Sequelize.BelongsToGetAssociationMixin<State>
	setState!: Sequelize.BelongsToSetAssociationMixin<State, StateId>
	createState!: Sequelize.BelongsToCreateAssociationMixin<State>
	// Order belongsTo User via userId
	user!: User
	getUser!: Sequelize.BelongsToGetAssociationMixin<User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<User>

	static initModel(sequelize: Sequelize.Sequelize): typeof Order {
		return Order.init(
			{
				orderId: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					field: 'order_id',
				},
				total: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: true,
					defaultValue: 0.0,
				},
				dateYymmdd: {
					type: DataTypes.DATEONLY,
					allowNull: false,
					field: 'dateYYMMDD',
				},
				stateId: {
					type: DataTypes.TINYINT,
					allowNull: true,
					references: {
						model: 'state',
						key: 'state_id',
					},
					field: 'state_id',
				},
				userId: {
					type: DataTypes.MEDIUMINT.UNSIGNED,
					allowNull: true,
					references: {
						model: 'user',
						key: 'user_id',
					},
					field: 'user_id',
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
				tableName: 'order',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'order_id' }],
					},
					{
						name: 'estado_id',
						using: 'BTREE',
						fields: [{ name: 'state_id' }],
					},
					{
						name: 'usuario_id',
						using: 'BTREE',
						fields: [{ name: 'user_id' }],
					},
				],
			},
		)
	}
}
