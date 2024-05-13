
import { Component, OnInit, inject } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit{
  
  chatHistory: any[] = [];

  prompt: string='';
  loading:boolean=false;
 
  geminiService: GeminiService=inject(GeminiService);


  constructor() {
    this.geminiService.getMessaggHistory().subscribe((res)=>{
      if(res){
        this.chatHistory.push(res);
      }
    });
   }

   

  ngOnInit(): void { }



 async sendData() {

     if(this.prompt && !this.loading ){   
      this.loading=true;
       const data = this.prompt
       this.prompt='';
       await this.geminiService.generteText(data);
       this.loading=false;
     }
  }
   

  formatText(text: string){
    const result= text.replaceAll('*','');

    return result
  }


  



  

}
