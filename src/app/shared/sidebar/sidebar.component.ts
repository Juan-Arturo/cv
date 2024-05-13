import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,FormsModule,PopoverModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {



  public hotmail: string ="https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=150&ct=1713985830&rver=7.0.6738.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26cobrandid%3dab0455a0-8d03-46b9-b18b-df2f57b9e44c%26culture%3des-mx%26country%3dmx%26RpsCsrfState%3da827c97c-ed1f-3093-aca6-c7c00defc970&id=292841&aadredir=1&whr=hotmail.com&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c";
  public github: string ="correo";
  public gamil: string ="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=AaSxoQxpOKzFqL4mn42vMO9ef4sPyEAYQ1zqg4HYZJoI-eTwGpMubusvijl8SyUY2VwxSCU65Gi70w&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-636727605%3A1713986276374072&theme=mn&ddm=0";
  public whatsapp: string ="https://wa.me/2461969362?text=¡Hola!";


}

