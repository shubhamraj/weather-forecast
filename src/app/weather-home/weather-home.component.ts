import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnInit {
  EuropeanCity:any;
  EuropeanCityDetails:any=[];
  constructor(public weatherService: WeatherService, private router: Router) { }

  ngOnInit(): void {
    this.CityDetails();
  }

  //get city details
  CityDetails(){
    this.EuropeanCity = ["Berlin","London","Paris","Amsterdam","Lisbon"];
    for(let city of this.EuropeanCity){
       this.weatherService.getCityDetails(city).subscribe(data=>{
        if(data != undefined){
           this.EuropeanCityDetails.push(data);
           this.WeatherCalculation();
        }
      });
    }
  }

  //Weather Calculation for temperature, sunrise, sunset
  WeatherCalculation(){
    for(let cityDetails of this.EuropeanCityDetails){

      cityDetails['temperature'] = (cityDetails.main.temp - 273.15).toFixed(2);
      
      const unixTimesunset = cityDetails.sys.sunset;
      const sunsetunix = new Date(unixTimesunset * 1e3);
      const sunsetdate =  moment(sunsetunix).utcOffset("+01:00").format("hh:mm A");
      cityDetails['sunset'] = sunsetdate;

      const unixTimesunrise = cityDetails.sys.sunrise;
      const sunriseunix = new Date(unixTimesunrise * 1e3);
      const sunrisedate =  moment(sunriseunix).utcOffset("+01:00").format("hh:mm A");
      cityDetails['sunrise'] = sunrisedate;  

     }
  }

  //on city change
  onCity(value){
    let passBody = btoa(value.name);
    this.router.navigate(['details', passBody]);
  }

}
