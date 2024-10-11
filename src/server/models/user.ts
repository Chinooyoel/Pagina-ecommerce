import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Order, OrderId } from './order'

export interface UserAttributes {
	userId: number
	name: string
	email: string
	password: string
	role?: 'USUARIO' | 'ADMIN' | 'ESPECTADOR'
	state?: string
	createdAt: Date
	updatedAt: Date
}

export type UserPk = 'userId'
export type UserId = User[UserPk]
export type UserOptionalAttributes =
	| 'userId'
	| 'role'
	| 'state'
	| 'createdAt'
	| 'updatedAt'
export type UserCreationAttributes = Optional<
	UserAttributes,
	UserOptionalAttributes
>

export class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	userId!: number
	name!: string
	email!: string
	password!: string
	role?: 'USUARIO' | 'ADMIN' | 'ESPECTADOR'
	state?: string
	createdAt!: Date
	updatedAt!: Date

	// User hasMany Order via userId
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

	static initModel(sequelize: Sequelize.Sequelize): typeof User {
		return User.init(
			{
				userId: {
					autoIncrement: true,
					type: DataTypes.MEDIUMINT.UNSIGNED,
					allowNull: false,
					primaryKey: true,
					field: 'user_id',
				},
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: 'email',
				},
				password: {
					type: DataTypes.STRING(200),
					allowNull: false,
				},
				role: {
					type: DataTypes.ENUM('USUARIO', 'ADMIN', 'ESPECTADOR'),
					allowNull: true,
					defaultValue: 'USUARIO',
				},
				state: {
					type: DataTypes.CHAR(1),
					allowNull: true,
					defaultValue: 'A',
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
				tableName: 'user',
				timestamps: true,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'user_id' }],
					},
					{
						name: 'email',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'email' }],
					},
				],
			},
		)
	}
}
