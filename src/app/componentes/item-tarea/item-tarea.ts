// Importa las herramientas necesarias:
// - input: recibe datos del componente padre (signal-based)
// - output: emite datos hacia el componente padre (signal-based)
import { Component, input, output } from '@angular/core';

import { Task } from '../../models/tarea.model'; // Importa la interfaz que define la forma de una tarea

@Component({
  selector: 'app-item-tarea', // Etiqueta con la que se llama al componente desde el HTML
  imports: [], // Otros componentes o módulos que este componente necesitaría usar en su HTML
  templateUrl: './item-tarea.html', // HTML asociado al componente
  styleUrl: './item-tarea.css', // CSS asociado al componente
})
export class ItemTarea {
  // Input obligatorio: ListaTareas SIEMPRE tiene que pasar una tarea,
  // Para leer su valor en el HTML se usa como función: tarea()
  tarea = input.required<Task>();

  
  // CLICK EN EDITAR: Emite la tarea COMPLETA, porque el padre necesita los datos
  editar = output<Task>();

  // CLICK EN ELIMINAR: Emite solo el ID, porque es lo único que necesita el método deleteTask() del service
  eliminar = output<number>();

  // CLICK EN ESTADO: Emite la tarea COMPLETA, porque el padre necesita saber el estado actual
  cambiarEstado = output<Task>();

  // Emite evento "editar" hacia el padre, mandando la TAREA actual.
  onEditar(): void{
    this.editar.emit(this.tarea())
  }

  // Emite evento "eliminar" hacia el padre, mandando el ID de la TAREA.
  onEliminar(): void{
    this.eliminar.emit(this.tarea().id)
  }

  // Emite evento "cambiarEstado" hacia el padre, mandando la TAREA actual.
  onCambiarEstado(): void{
    this.cambiarEstado.emit(this.tarea())
  }
}