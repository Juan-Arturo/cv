import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(to: string, from:string, subject:string, text:string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('api:78cc2d24789e2b3f236f8400185ad4ca-2175ccc2-ae862a17') // Esto es para la autenticación básica
    });

    const body = `to=${to}&from=${from}&subject=${subject}&text=${text}`;

    return this.http.post('https://api.mailgun.net/v3/sandboxce55b15c61944106988c9c02402ba26f.mailgun.org/messages', body, { headers });
  }
}
