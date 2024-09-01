import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LibraryInsectComponent } from "./library/library.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'insects', component: LibraryInsectComponent },
  ];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
  };