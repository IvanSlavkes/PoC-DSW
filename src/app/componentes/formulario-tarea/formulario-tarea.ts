import { Component, inject, OnInit, signal, output, input } from '@angular/core';
import { Tarea } from '../../services/tarea';
import { Task } from '../../models/tarea.model';
import { TaskSinId } from '../../models/tarea.model';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-tarea',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-tarea.html',
  styleUrl: './formulario-tarea.css',
})
export class FormularioTarea{
  private fb = inject(FormBuilder);

  guardar = output<TaskSinId>();

  tareaForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    estado: ['pendiente' as 'pendiente' | 'completada', Validators.required],
    fechaDesde: ['', Validators.required],
    fechaHasta: [''],
  });

  onSubmit(): void { // Función de ENVIAR y POSTEAR la nueva TAREA
    if (this.tareaForm.valid) {
      const valores = this.tareaForm.getRawValue();

      const nuevaTarea: TaskSinId = {
        nombre: valores.nombre!,
        descripcion: valores.descripcion ?? undefined,
        estado: valores.estado!,
        fechaDesde: new Date(valores.fechaDesde!),
        fechaHasta: valores.fechaHasta ? new Date(valores.fechaHasta) : undefined,
      };

      this.guardar.emit(nuevaTarea);
      this.tareaForm.reset({ estado: 'pendiente' });
    }
  }
}