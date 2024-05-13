
import {Component} from '@angular/core'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  skills: any[] = [
    { name: 'Liderazgo', icon: 'bi bi-person-raised-hand' }, // Bootstrap Icons
    { name: 'Responsabilidad', icon: 'bi bi-person-lines-fill' },
    { name: 'Comunicación', icon: 'bi bi-chat-dots-fill' },
    { name: 'Trabajo en equipo', icon: 'bi bi-people-fill' },
    { name: 'Facilidad de palabra', icon: 'bi bi-mic-fill' },
    { name: 'Toma de decisiones', icon: 'bi bi-clipboard2-check' },
    { name: 'Capacidad de aprendizaje', icon: 'bi bi-lightbulb-fill' },
    { name: 'Manejo de situaciones', icon: 'bi bi-exclamation-diamond-fill' }
  ];
}
