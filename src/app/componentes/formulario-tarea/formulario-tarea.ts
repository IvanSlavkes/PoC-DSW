import { Component, inject, OnInit, signal, output, input, effect } from '@angular/core';
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
export class FormularioTarea {
  private fb = inject(FormBuilder);

  tareaAEditar = input<Task | null>(null);

  guardar = output<TaskSinId>();
  cancelar = output<void>();
  completar = output<void>();

  tareaForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    estado: [{ value: 'pendiente' as 'pendiente' | 'completada', disabled: true }],
  });

  constructor() {
    effect(() => {
      const tarea = this.tareaAEditar();

      if (tarea) {
        // Modo edición: precargar con los datos existentes
        this.tareaForm.patchValue({
          nombre: tarea.nombre,
          descripcion: tarea.descripcion ?? '',
          estado: tarea.estado,
        });
        
      } else {
        // Modo creación: resetear a valores por defecto
        this.tareaForm.reset({
          nombre: '',
          descripcion: '',
        });
        this.tareaForm.get('estado')?.setValue('pendiente');
        
      }
    });
  }

  onSubmit(): void {
    if (this.tareaForm.valid) {
      const valores = this.tareaForm.getRawValue();

      const datosTarea: TaskSinId = {
        nombre: valores.nombre!,
        descripcion: valores.descripcion ?? undefined,
        estado: valores.estado!,
      };

      this.guardar.emit(datosTarea);
    }
  }

  onCancelar(): void {
    this.cancelar.emit();
  }

}