import { Component, inject, OnInit, signal } from '@angular/core';
import { Tarea } from '../../services/tarea';
import { Task } from '../../models/tarea.model';

@Component({
  selector: 'app-formulario-tarea',
  imports: [],
  templateUrl: './formulario-tarea.html',
  styleUrl: './formulario-tarea.css',
})
export class FormularioTarea implements OnInit{
  private tareaService = inject(Tarea);

  tareas = signal<Task[]>([]);

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.getTasks().subscribe(data => {
      this.tareas.set(data);
    })
  }
}
