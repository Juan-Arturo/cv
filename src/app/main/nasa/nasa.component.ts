import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../services/nasa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import {EpicData} from '../../interfaces/nasa/epicData.interface'
import { EpicTransformedData } from '../../interfaces/nasa/epicTransformedData .intyerface';
import { response } from 'express';

@Component({
  selector: 'app-nasa',
  standalone: true,
  imports: [CommonModule,FormsModule,MaterialModule],
  templateUrl: './nasa.component.html',
  styleUrl: './nasa.component.css'
})
export class NasaComponent implements OnInit {
  epicData: EpicTransformedData[] = [];

  constructor(private nasaService:NasaService){

  }

  ngOnInit() {
    const date = '2024-01-30'; // Fecha mas reciente de la informacion de la nasa api
    this.getEpicData(date);
  }


 // Método para obtener los datos del método getEpicData y almacenarlos en epicData
 getEpicData(date: string): void {
  this.nasaService.getEpicData(date).subscribe((data: EpicData[]) => {
    // Recorremos los datos y almacenamos la información relevante en epicData
    this.epicData = data.map(response => {
      return {
        imageUrl: this.nasaService.getEpicImages(date, response.image), // URL de la imagen
        identifier: response.identifier,
        caption: response.caption,
        date: response.date
      };
    });
  });
}

}
