import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
  ];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };