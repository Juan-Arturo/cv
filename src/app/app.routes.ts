import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { AboutComponent } from './main/about/about.component';
import path from 'node:path';
import { ResumeComponent } from './main/resume/resume.component';
import { PokedexComponent } from './main/pokedex/pokedex.component';
import { ContactComponent } from './main/contact/contact.component';
import { SkillsComponent } from './main/skills/skills.component';
import { ChatbotComponent } from './main/chatbot/chatbot.component';
import { NasaComponent } from './main/nasa/nasa.component';


export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "about", component: AboutComponent},
    {path: "resume", component:ResumeComponent},
    {path: "pokedex", component:PokedexComponent},
    {path: "skills", component: SkillsComponent},
    {path: "contact", component: ContactComponent},
    {path: "chatbot", component: ChatbotComponent},
    {path: "nasa", component: NasaComponent}



];
