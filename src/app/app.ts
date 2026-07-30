import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Barra } from './componentes/barra/barra';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Barra],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Poc-DEMO');
}
