import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { EpicData } from '../interfaces/nasa/epicData.interface';
import { TechTransfer, TechTransferResult } from '../interfaces/nasa/TechTransfer';
import { Apod } from '../interfaces/nasa/Apod.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private apiKey = "WZtjU4dEOnmbXTgqFwJgNfEycXOGkAGQe2EQmn6H"
  private nasaUrl = "https://api.nasa.gov/"



  constructor(private http: HttpClient) {

  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // Mostrar alerta de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  '!Algo salió mal! intente más tarde',
      });
      // Retornar un valor por defecto
      return of(result as T);
    };
  }




  getEpicData(date: string): Observable<EpicData[]> {
    return this.http.get<any[]>(`${this.nasaUrl}EPIC/api/natural/date/${date}?api_key=${this.apiKey}`).pipe(
      map((data: any[]) => data.map(response => ({
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
      }))),
      catchError(this.handleError<EpicData[]>([]))
    );
  }

  getEpicImages(date: string, imageName: string): string {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return `${this.nasaUrl}EPIC/archive/natural/${year}/${month}/${day}/png/${imageName}.png?api_key=${this.apiKey}`;
  }

  getTechTransfer(): Observable<{ results: TechTransferResult[], total: number, perPage: number, page: number }> {
    return this.http.get<TechTransfer>(`${this.nasaUrl}techtransfer/patent/?engine&api_key=${this.apiKey}`).pipe(
      map((data: TechTransfer) => {
        const results = data.results.map(result => ({
          id: result[0],
          name: result[1],
          title: result[2],
          description: result[3],
          category: result[5],
          imageUrl: result[10]
        }));
        return {
          results,
          total: data.total,
          perPage: data.perPage,
          page: data.page
        };
      }),
      catchError(this.handleError<{ results: TechTransferResult[], total: number, perPage: number, page: number }>({
        results: [],
        total: 0,
        perPage: 0,
        page: 0
      }))
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
      })),
      catchError(this.handleError<Apod>({
        copyright: '',
        date: new Date(),
        explanation: '',
        url: '',
        media_type: '',
        service_version: '',
        title: ''
      }))
    );
  }
}


// https://api.nasa.gov/planetary/apod?api_key=WZtjU4dEOnmbXTgqFwJgNfEycXOGkAGQe2EQmn6H&date=2024-05-5
