import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Producto } from '../producto';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html'

})
export class EditarProductoComponent {
  producto: Producto = new Producto();
  id: number;

  constructor(private productoServicio: ProductoService, private ruta: ActivatedRoute, private enrutador: Router) {

  }

  ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe(
      {
        next: (datos) => this.producto = datos,
        error: (error: any) => console.log(error)
      }
    );
  }

  onSubmit() {
    this.guardarProducto();
  }

  guardarProducto() {
    this.productoServicio.editarProducto(this.id, this.producto).subscribe(
      {
        next: (datos) => this.irProductoLista(),
        error: (error) => console.log(error)
      }
    );
  }

  irProductoLista() {
    this.enrutador.navigate(['/productos']);
  }
}
