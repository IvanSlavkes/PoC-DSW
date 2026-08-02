import { Component, input, output } from '@angular/core';
import { Task } from '../../models/tarea.model';
@Component({
  selector: 'app-item-tarea',
  imports: [],
  templateUrl: './item-tarea.html',
  styleUrl: './item-tarea.css',
})
export class ItemTarea {
  tarea = input.required<Task>();

  editar = output<Task>();
  eliminar = output<number>(); //Eliminar por ID
  cambiarEstado = output<Task>();

  onEditar(): void{
    this.editar.emit(this.tarea())
  }

  onEliminar(): void{
    this.eliminar.emit(this.tarea().id)
  }

  onCambiarEstado(): void{
    this.cambiarEstado.emit(this.tarea())
  }
}
