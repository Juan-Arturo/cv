import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NasaService } from '../../../services/nasa.service';
import { response } from 'express';
import { Apod } from '../../../interfaces/nasa/Apod.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SafeUrlPipePipe } from '../../../pipes/safe-url-pipe.pipe';

@Component({
  selector: 'app-apod',
  standalone: true,
  imports: [ MatCardModule,CommonModule,
    MatButtonModule,LazyLoadImageModule,SafeUrlPipePipe],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.css'
})
export class ApodComponent implements OnInit {
  @ViewChild('videoIframe') videoIframe: ElementRef;
  apodData: Apod;// Declara una variable para almacenar los datos del APOD
  isShowingFullScreenImage: boolean = false;


  constructor(private nasaService: NasaService) {
  }

  ngOnInit() {
    this.getAPOD();


  }

  getAPOD(): void {
    this.nasaService.getApod().subscribe({
      next: (data: Apod) => {
        this.apodData = data;
       
      },
      error: (error: any) => {
        console.error('Error al obtener los datos del APOD:', error);
      }
    });
  }




  toggleFullVideo(videoIframe: ElementRef): void {
    this.isShowingFullScreenImage = !this.isShowingFullScreenImage;

    if (!this.isShowingFullScreenImage && this.apodData.media_type === 'video') {
      const iframe = videoIframe.nativeElement;
      const videoSrc = iframe.src;
      iframe.src = '';
      iframe.src = videoSrc;
    }
  }


}
