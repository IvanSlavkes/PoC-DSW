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
  cancelar = output<void>();

  private obtenerFechaHoy(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  tareaForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    estado: [{ value: 'pendiente' as 'pendiente' | 'completada', disabled: true }],
    fechaDesde: [this.obtenerFechaHoy(), Validators.required],
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