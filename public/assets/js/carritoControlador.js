class Carrito{
    constructor(productos, total, cantidad){
        this.productos = productos;
        this.total = total;
        this.cantidad = cantidad;
    }

    leerProducto( productoDOM ){
        const id = Number(productoDOM.querySelector("[name=nombreProducto]").dataset.id);
        const nombre = productoDOM.querySelector("[name=nombreProducto]").textContent;
        const precio = Number(productoDOM.querySelector("[name=precioProducto]").textContent);
        let img;
        if( productoDOM.querySelector("[name=imgProducto]") != null  ){
            img = productoDOM.querySelector("[name=imgProducto]").src;
        }else{
            img = document.getElementsByTagName("img")[0].src;
        }
    
        const producto = {
            id,
            nombre,
            precio,
            img
        }

        return producto;
    }

    añadirProducto( producto ){
        const posicion = this.buscarProductoEnElCarrito( producto );

        if( posicion === -1 ){
            producto.cantidad = 1;
            this.productos.push( producto );
            this.cantidad ++;
            this.total += producto.precio;
        }else{
            this.productos[ posicion ].cantidad ++;
            this.cantidad ++;
            this.total += producto.precio;
        }

    }

    buscarProductoEnElCarrito( producto ){
        let posicion = -1;

        for( let i = 0; i < this.productos.length; i++ ){
            if( this.productos[i].id === producto.id ){
                posicion = i;
            }
        }
        return posicion;
    }

    eliminarProducto( producto ){
        const posicion = this.buscarProductoEnElCarrito( producto );

        if( posicion != -1){
            this.cantidad -= this.productos[ posicion ].cantidad;
            this.total -= this.productos[ posicion ].cantidad * this.productos[ posicion ].precio;

            this.productos = this.productos.filter( elemento => elemento.id != this.productos[posicion].id );
        }
        
    }
}