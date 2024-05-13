import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';



// Agrega los íconos que necesitas utilizar
library.add(faAngular);

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
