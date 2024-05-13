import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BehaviorSubject, Observable, from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private projectId="AIzaSyAcP8GWY7wyTm2nazF4meX1ch7Upf6YnRw"
  private generateAI: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);
  

  constructor() { 
    this.generateAI=new GoogleGenerativeAI(this.projectId)
  }

  async generteText(prompt: string){
    const model=this.generateAI.getGenerativeModel({model:'gemini-pro'});

    this.messageHistory.next({
      from: 'user',
      message: prompt
    })


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    this.messageHistory.next({
      from: 'bot',
      message: text
    })
  }


  public getMessaggHistory(): Observable<any>{
    return this.messageHistory.asObservable();
  }
}
