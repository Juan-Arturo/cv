import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../services/nasa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import {EpicData} from '../../interfaces/nasa/epicData.interface'
import { EpicTransformedData } from '../../interfaces/nasa/epicTransformedData .intyerface';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-nasa',
  standalone: true,
  imports: [CommonModule,FormsModule,MaterialModule,LazyLoadImageModule],
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


  getEpicData(date: string): void {
    this.nasaService.getEpicData(date).subscribe((data: EpicData[]) => {
      // Recorremos los datos y almacenamos la información relevante en epicData
      this.epicData = data.map(response => {
        return {
          imageUrl: this.nasaService.getEpicImages(date, response.image), // URL de la imagen
          identifier: response.identifier,
          date: response.date,
          centroid_coordinates: { // Agregamos centroid_coordinates
            lat: response.centroid_coordinates.lat,
            lon: response.centroid_coordinates.lon
          }
        };
      });
    });
  }


  convertToDMS(coordinate: number, isLat: boolean): string {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    const direction = coordinate >= 0 ? (isLat ? 'N' : 'E') : (isLat ? 'S' : 'W');

    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }

}
