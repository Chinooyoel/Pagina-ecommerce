import type { Sequelize } from 'sequelize'
import { Brand as _Brand } from './brand'
import type { BrandAttributes, BrandCreationAttributes } from './brand'
import { Category as _Category } from './category'
import type { CategoryAttributes, CategoryCreationAttributes } from './category'
import { Order as _Order } from './order'
import type { OrderAttributes, OrderCreationAttributes } from './order'
import { OrderDetail as _OrderDetail } from './orderDetail'
import type {
	OrderDetailAttributes,
	OrderDetailCreationAttributes,
} from './orderDetail'
import { Product as _Product } from './product'
import type { ProductAttributes, ProductCreationAttributes } from './product'
import { State as _State } from './state'
import type { StateAttributes, StateCreationAttributes } from './state'
import { Subcategory as _Subcategory } from './subcategory'
import type {
	SubcategoryAttributes,
	SubcategoryCreationAttributes,
} from './subcategory'
import { Supplier as _Supplier } from './supplier'
import type { SupplierAttributes, SupplierCreationAttributes } from './supplier'
import { User as _User } from './user'
import type { UserAttributes, UserCreationAttributes } from './user'

export {
	_Brand as Brand,
	_Category as Category,
	_Order as Order,
	_OrderDetail as OrderDetail,
	_Product as Product,
	_State as State,
	_Subcategory as Subcategory,
	_Supplier as Supplier,
	_User as User,
}

export type {
	BrandAttributes,
	BrandCreationAttributes,
	CategoryAttributes,
	CategoryCreationAttributes,
	OrderAttributes,
	OrderCreationAttributes,
	OrderDetailAttributes,
	OrderDetailCreationAttributes,
	ProductAttributes,
	ProductCreationAttributes,
	StateAttributes,
	StateCreationAttributes,
	SubcategoryAttributes,
	SubcategoryCreationAttributes,
	SupplierAttributes,
	SupplierCreationAttributes,
	UserAttributes,
	UserCreationAttributes,
}

export function initModels(sequelize: Sequelize) {
	const Brand = _Brand.initModel(sequelize)
	const Category = _Category.initModel(sequelize)
	const Order = _Order.initModel(sequelize)
	const OrderDetail = _OrderDetail.initModel(sequelize)
	const Product = _Product.initModel(sequelize)
	const State = _State.initModel(sequelize)
	const Subcategory = _Subcategory.initModel(sequelize)
	const Supplier = _Supplier.initModel(sequelize)
	const User = _User.initModel(sequelize)

	Product.belongsTo(Brand, { foreignKey: 'brandId' })
	Brand.hasMany(Product, { foreignKey: 'brandId' })
	Subcategory.belongsTo(Category, { foreignKey: 'categoryId' })
	Category.hasMany(Subcategory, { foreignKey: 'categoryId' })
	OrderDetail.belongsTo(Order, { foreignKey: 'orderId' })
	Order.hasMany(OrderDetail, { foreignKey: 'orderId' })
	OrderDetail.belongsTo(Product, { foreignKey: 'productId' })
	Product.hasMany(OrderDetail, { foreignKey: 'productId' })
	Order.belongsTo(State, { foreignKey: 'stateId' })
	State.hasMany(Order, { foreignKey: 'stateId' })
	Product.belongsTo(Subcategory, { foreignKey: 'subcategoryId' })
	Subcategory.hasMany(Product, { foreignKey: 'subcategoryId' })
	Product.belongsTo(Supplier, { foreignKey: 'supplierId' })
	Supplier.hasMany(Product, { foreignKey: 'supplierId' })
	Order.belongsTo(User, { foreignKey: 'userId' })
	User.hasMany(Order, { foreignKey: 'userId' })

	return {
		Brand: Brand,
		Category: Category,
		Order: Order,
		OrderDetail: OrderDetail,
		Product: Product,
		State: State,
		Subcategory: Subcategory,
		Supplier: Supplier,
		User: User,
	}
}
