import { Component, inject, OnInit, signal } from '@angular/core';
import { Tarea } from '../../services/tarea';
import { Task, TaskSinId } from '../../models/tarea.model';
import { ItemTarea } from '../item-tarea/item-tarea';
import { FormularioTarea } from '../formulario-tarea/formulario-tarea';

@Component({
  selector: 'app-lista-tareas',
  imports: [ItemTarea, FormularioTarea],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export class ListaTareas implements OnInit {
  private tareaService = inject(Tarea);

  tareas = signal<Task[]>([]);
  filtro = signal<'todas' | 'pendiente' | 'completada'>('todas');
  tareaEnEdicion = signal<Task | null>(null);
  mostrarFormulario = signal(false);

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.getTasks().subscribe(data => {
      this.tareas.set(data);
    });
  }

  abrirFormulario(): void {
    this.tareaEnEdicion.set(null);
    this.mostrarFormulario.set(true);
  }

  cerrarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.tareaEnEdicion.set(null);
  }

  onGuardar(datos: TaskSinId): void {
    const enEdicion = this.tareaEnEdicion();

    if (enEdicion) {
      this.tareaService.updateTask(enEdicion.id, { ...datos, id: enEdicion.id }).subscribe(() => {
        this.cerrarFormulario();
        this.cargarTareas();
      });
    } else {
      this.tareaService.createTask(datos as Task).subscribe(() => {
        this.cerrarFormulario();
        this.cargarTareas();
      });
    }
  }

  onEditar(tarea: Task): void {
    this.tareaEnEdicion.set(tarea);
    this.mostrarFormulario.set(true);
  }

  onEliminar(id: number): void {
    this.tareaService.deleteTask(id).subscribe(() => {
      this.cargarTareas();
    });
  }
}