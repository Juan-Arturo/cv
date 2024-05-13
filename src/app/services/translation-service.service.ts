import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private readonly GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';
  private readonly GOOGLE_TRANSLATE_API_KEY = 'tu_clave_de_API_de_Google_Translate';

  constructor(private http: HttpClient) { }

  translateToSpanish(text: string): Observable<string> {
    const targetLanguage = 'es';
    const body = {
      q: text,
      target: targetLanguage,
      key: this.GOOGLE_TRANSLATE_API_KEY
    };
    return this.http.post<any>(this.GOOGLE_TRANSLATE_API_URL, body).pipe(
      map(response => response.data.translations[0].translatedText)
    );
  }
}

