import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Barra } from './componentes/barra/barra';
import { FormularioTarea } from './componentes/formulario-tarea/formulario-tarea';
import { ListaTareas } from "./componentes/lista-tareas/lista-tareas";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Barra, ListaTareas, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Poc-DEMO');
}
