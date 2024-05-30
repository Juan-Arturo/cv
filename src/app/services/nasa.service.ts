import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EpicData } from '../interfaces/nasa/epicData.interface';
import { response } from 'express';
import { TechTransfer, TechTransferResult } from '../interfaces/nasa/TechTransfer';
import { title } from 'process';
import { Apod } from '../interfaces/nasa/Apod.interface';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private apiKey = "WZtjU4dEOnmbXTgqFwJgNfEycXOGkAGQe2EQmn6H"
  private nasaUrl = "https://api.nasa.gov/"



  constructor(private http: HttpClient) {

  }

  getPictureOfTheDay(): Observable<any> {
    return this.http.get(`${this.nasaUrl}planetary/apod?api_key=${this.apiKey}`);
  }


  getEpicData(date: string): Observable<EpicData[]> {
    return this.http.get<any[]>(`${this.nasaUrl}EPIC/api/natural/date/${date}?api_key=${this.apiKey}`).pipe(
      map((data: any[]) => {
        // Aquí conviertes los datos obtenidos en EpicData[]
        return data.map(response => ({
          identifier: response.identifier,
          caption: response.caption,
          image: response.image,
          version: response.version,
          centroid_coordinates: response.centroid_coordinates,
          dscovr_j2000_position: response.dscovr_j2000_position,
          lunar_j2000_position: response.lunar_j2000_position,
          sun_j2000_position: response.sun_j2000_position,
          attitude_quaternions: response.attitude_quaternions,
          date: response.date,
          coords: response.coords
        }));
      })
    );
  }

  getEpicImages(date: string, imageName: string): string {
    const year = date.substring(0, 4);  // Extrae el año (2024)
    const month = date.substring(5, 7); // Extrae el mes (01)
    const day = date.substring(8, 10);  // Extrae el día (30)
    return `${this.nasaUrl}EPIC/archive/natural/${year}/${month}/${day}/png/${imageName}.png?api_key=${this.apiKey}`;
  }



  getTechTransfer(): Observable<{ results: TechTransferResult[], total: number, perPage: number, page: number }> {
    return this.http.get<TechTransfer>(`${this.nasaUrl}techtransfer/patent/?engine&api_key=${this.apiKey}`)
      .pipe(
        map((data: TechTransfer) => {
          const results = data.results.map(result => ({
            id: result[0],
            name: result[1],
            title: result[2],
            description: result[3],
            category: result[5],
            imageUrl: result[10] // direccion url imagen
          }));
          return {
            results,
            total: data.total,
            perPage: data.perPage,
            page: data.page
          };
        })
      );
  }


  getApod(): Observable<Apod> {
    return this.http.get(`${this.nasaUrl}planetary/apod?api_key=${this.apiKey}`).pipe(
      map((response: any) => ({
        copyright: response.copyright,
        date: new Date(response.date),
        explanation: response.explanation,
        url: response.url,
        media_type: response.media_type,
        service_version: response.service_version,
        title: response.title,
      }))
    );
  }

}


// https://api.nasa.gov/planetary/apod?api_key=WZtjU4dEOnmbXTgqFwJgNfEycXOGkAGQe2EQmn6H&date=2024-05-5
