import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { WeatherHomeComponent } from './weather-home/weather-home.component';


const routes: Routes = [
  {path:'home', component: WeatherHomeComponent},
  {path:'details/:id', component: WeatherDetailsComponent},
  {path: '**', redirectTo:'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
