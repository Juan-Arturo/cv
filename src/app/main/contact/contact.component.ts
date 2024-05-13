import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { google } from 'googleapis';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name: string ='';
  email: string ='';
  subject: string='';
  message: string='';

  constructor(private http:HttpClient) {
    
  }

 
  enviarCorreo() {
    gapi.load('auth', () => {
      gapi.auth.authorize({
        client_id: '977972119442-n26gdae7v3qcsmo5ajt2cvarv7k0djcm.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/gmail.send',
        immediate: false
      }, (authResult: any) => {
        if (authResult && !authResult.error) {
          const accessToken = authResult.access_token;
          const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
          const emailData = {
            raw: this.createEmail()
          };
          this.http.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', emailData, { headers })
            .subscribe(response => {
              console.log('Correo enviado correctamente:', response);
            }, error => {
              console.error('Error al enviar el correo:', error);
            });
        } else {
          console.error('Error de autenticación:', authResult.error);
        }
      });
    });
  }

  createEmail() {
    const to = 'ITNetworksMX2023@gmail.com';
    const subject = this.subject;
    const message = this.message;
    const email = [
      'Content-Type: text/plain; charset="UTF-8"\n',
      'MIME-Version: 1.0\n',
      `To: ${to}\n`,
      `Subject: ${subject}\n\n`,
      `${message}`
    ].join('');
    return btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}