// - inject: para pedir dependencias sin usar el constructor
// - effect: para ejecutar código automáticamente cuando una signal cambia
import { Component, inject, output, input, effect } from '@angular/core';

// Importa los tipos del modelo de datos
import { Task, TaskSinId } from '../../models/tarea.model';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-tarea', // Etiqueta con la que se llama al componente desde el HTML
  imports: [ReactiveFormsModule], // Otros componentes o módulos que este componente necesitaría usar en su HTML
  templateUrl: './formulario-tarea.html', // HTML asociado al componente
  styleUrl: './formulario-tarea.css', // CSS asociado al componente
})
export class FormularioTarea {
  // Inyecta el FormBuilder, la herramienta que arma el objeto de formulario reactivo
  private fb = inject(FormBuilder);

  // Input opcional: NULL = formulario modo CREAR ; TASK = formulario modo EDITAR (le envia los datos de la tarea a editar)
  tareaAEditar = input<Task | null>(null);

  // Evento que emite los datos del formulario cuando se guarda (CREAR o EDITAR)
  guardar = output<TaskSinId>(); // Envia una TAREA sin ID, ya que la API se lo da cuando se guarda en la DB

  // Evento que avisa al padre que se canceló el formulario (cerrar sin guardar)
  cancelar = output<void>();

  // Definición del formulario reactivo: cada clave es un campo del form
  tareaForm = this.fb.group({
    nombre: ['', Validators.required], // Obligatorio, arranca vacío
    descripcion: [''], // Opcional, arranca vacío
    // Estado queda SIEMPRE deshabilitado y no se muestra en el HTML
    // ya que este se CAMBIA mediante otro boton no desde este formulario
    // Lo mantuvimos en el FormGroup porque TASK o TASKSINID lo requieren
    estado: [{ value: 'pendiente' as 'pendiente' | 'completada', disabled: true }],
  });

  // Inicializa el componente y configura un efecto reactivo para precargar el formulario   
  constructor() { // Se ejecuta automáticamente al crear el componente en memoria.

    // effect() ejecuta este bloque automáticamente cada vez que
    // alguna signal leída adentro (en este caso, tareaAEditar()) cambia de valor
    effect(() => {
      const tarea = this.tareaAEditar();

      if (tarea) {
        // MODO EDICION: hay una TAREA -> precarga el Formulario con los datos ACTUALES de la tarea en cuestion
        this.tareaForm.patchValue({ // patchValue: sirve para cambiar los valores que ya tiene la tarea
          nombre: tarea.nombre,
          descripcion: tarea.descripcion ?? '', // Si no tiene descripción queda vacio
          estado: tarea.estado,
        });

      } else {
        // MODO CREACION: TAREA = Null -> resetear el formulario con valores vacios
        this.tareaForm.reset({
          nombre: '',
          descripcion: '',
        });
        this.tareaForm.get('estado')?.setValue('pendiente'); // Todas las tareas nacen en estado = PENDIENTE
      }
    });
  }

  // Se ejecuta cuando el usuario envía el formulario
  onSubmit(): void {
    // Solo procede si todos los campos con validación pasan (ej: nombre no es Null o Vacio)
    if (this.tareaForm.valid) {

      // getRawValue() trae TODOS los valores, incluidos los deshabilitados
      // (.value ignora los deshabilitados)
      const valores = this.tareaForm.getRawValue();

      // Arma el objeto final con el tipo TaskSinId (la ID la asigna la API)
      const datosTarea: TaskSinId = {
        nombre: valores.nombre!, // El ! le dice a TS que no es NULL ya que se valido antes
        descripcion: valores.descripcion ?? undefined, // Puede ser undefined ya que es OPCIONAL
        estado: valores.estado!,
      };

      // Emite el evento GUARDAR hacia el padre con los datos armados
      // Este componente NO llama a la API directamente, solo avisa al padre
      this.guardar.emit(datosTarea);
    }
  }
  // Se ejecuta al apretar el botón CANCELAR -> avisa al padre para que cierre el Formulario
  onCancelar(): void {
    this.cancelar.emit();
  }
}