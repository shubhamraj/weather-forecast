import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey:any;
  constructor(private http: HttpClient) {
    this.apiKey = "3d8b309701a13f65b660fa2c64cdc517";
  }

  //open weather map current weather api
  getCityDetails(reqbody){
    let cityName = reqbody;
    let configUrl = "http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+this.apiKey;
    console.log(configUrl);
    return this.http.get(configUrl);
  }

  getCityForecast(reqbody){
    let cityName = reqbody;
    let configUrl ="http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid="+this.apiKey;
    return this.http.get(configUrl);
  } 
  
}
