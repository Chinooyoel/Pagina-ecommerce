import { BrandAttributes } from '../models/brand'
import { CategoryAttributes } from '../models/category'
import { OrderAttributes } from '../models/order'
import { OrderDetailAttributes } from '../models/orderDetail'
import { ProductAttributes } from '../models/product'
import { SubcategoryAttributes } from '../models/subcategory'
import { SupplierAttributes } from '../models/supplier'

export type ProductFull = ProductAttributes & {
	Brand?: BrandAttributes
	Supplier?: SupplierAttributes
	Category?: CategoryAttributes & { SubCategory?: SubcategoryAttributes }
}

export type ProductWithSubCategory = ProductAttributes & {
	SubCategory?: SubcategoryAttributes
}

export type OrderFull = OrderAttributes & {
	OrderDetail?: OrderDetailAttributes & {
		Product: ProductAttributes[]
	}
}
