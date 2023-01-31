import { CategoryDTO } from '../category/CategoryDTO';
import { MarkDTO } from '../mark/MarkDTO';
import { SubcategoryDTO } from '../subcategory/SubcategoryDTO';


interface ProductDTO {
	idproducto: number,
	nombre: string,
	descripcion: string,
	stock: number,
	garantia: string,
	codigo: string,
	precio: number,
	costo: number,
	img: string,
	estado: string
}

interface ProductFull extends ProductDTO, MarkDTO, CategoryDTO,SubcategoryDTO{
    proveedor_idproveedor: number,
	proveedor_nombre: string,
}

interface ProductSubcategory extends ProductDTO, SubcategoryDTO{}

interface Filters {
    palabraFiltro: string | undefined,
    categoriaFiltro: string | undefined,
    subcategoriaFiltro: string | undefined,
    marcaFiltro: string | undefined,
    orden: string | undefined
}

export {
	ProductDTO,
	ProductFull,
	ProductSubcategory,
	Filters,
};