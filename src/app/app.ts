import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Barra } from './barra/barra';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Barra],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Poc-DEMO');
}
