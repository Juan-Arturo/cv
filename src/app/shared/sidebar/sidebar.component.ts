import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,FormsModule,TooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {





  public hotmail: string ="JuanArturoGP2024@hotmail.com";
  public github: string ="JAGPJAGP002@gmail.com (juan-arturo)";
  public gamil: string ="JAGPJAGP002@gmail.com";
  public whatsapp: string ="https://wa.me/2461969362?text=¡Hola!";


}

