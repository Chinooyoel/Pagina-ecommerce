import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Order, OrderId } from './order'

export interface StateAttributes {
	stateId: number
	name: string
	createdAt: Date
	updatedAt: Date
}

export type StatePk = 'stateId'
export type StateId = State[StatePk]
export type StateOptionalAttributes = 'stateId' | 'createdAt' | 'updatedAt'
export type StateCreationAttributes = Optional<
	StateAttributes,
	StateOptionalAttributes
>

export class State
	extends Model<StateAttributes, StateCreationAttributes>
	implements StateAttributes
{
	stateId!: number
	name!: string
	createdAt!: Date
	updatedAt!: Date

	// State hasMany Order via stateId
	orders!: Order[]
	getOrders!: Sequelize.HasManyGetAssociationsMixin<Order>
	setOrders!: Sequelize.HasManySetAssociationsMixin<Order, OrderId>
	addOrder!: Sequelize.HasManyAddAssociationMixin<Order, OrderId>
	addOrders!: Sequelize.HasManyAddAssociationsMixin<Order, OrderId>
	createOrder!: Sequelize.HasManyCreateAssociationMixin<Order>
	removeOrder!: Sequelize.HasManyRemoveAssociationMixin<Order, OrderId>
	removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<Order, OrderId>
	hasOrder!: Sequelize.HasManyHasAssociationMixin<Order, OrderId>
	hasOrders!: Sequelize.HasManyHasAssociationsMixin<Order, OrderId>
	countOrders!: Sequelize.HasManyCountAssociationsMixin

	static initModel(sequelize: Sequelize.Sequelize): typeof State {
		return State.init(
			{
				stateId: {
					autoIncrement: true,
					type: DataTypes.TINYINT,
					allowNull: false,
					primaryKey: true,
					field: 'state_id',
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
				tableName: 'state',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'state_id' }],
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
