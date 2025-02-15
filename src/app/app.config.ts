import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LibraryComponent } from "./library/library.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'insects', component: LibraryComponent },
  ];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };