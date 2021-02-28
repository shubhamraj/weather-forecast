import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  forecastRecord:any;
  forecastListDetails:any=[];
  cityForecastDetails:any;
  CityName:any;

  constructor(public weatherService: WeatherService, public route: ActivatedRoute) {

    const cityname: string = this.route.snapshot.params.id;
    if(cityname != undefined && cityname != null){
      this.CityName = atob(cityname);
    }else{
      this.CityName = null;
    }

   }

  ngOnInit(): void {
    this.CityForecastDetails();
    this.CityForecastFiveDay();
  }

  //Forecast details of selected city.
  CityForecastDetails(){
    let city = this.CityName;
    this.weatherService.getCityDetails(city).subscribe(data=>{
      if(data != undefined){
        this.cityForecastDetails = data;
      
        const unixTimetoday = this.cityForecastDetails.dt;
        const unixtime = new Date(unixTimetoday * 1e3);
        const todayday =  moment(unixtime).format("dddd");
        this.cityForecastDetails['day'] = todayday;
        this.cityForecastDetails['temperature'] = (this.cityForecastDetails.main.temp - 273.15).toFixed(0);
        this.cityForecastDetails['windspeed'] = this.cityForecastDetails.wind.speed.toFixed(0);
        this.cityForecastDetails['sea_level'] = this.cityForecastDetails.main.sea_level ?  this.cityForecastDetails.main.sea_level :  this.cityForecastDetails.main.pressure;
      }
    },err=>{
        alert(err);
    });
  }

  //5 day weather forecast 
  CityForecastFiveDay(){
    let city = "pune";
    this.weatherService.getCityForecast(city).subscribe(data=>{
      if(data != undefined){
        this.forecastRecord = data;
        let forecastList = this.forecastRecord.list;
        this.forecastListDetails =[];
        for(let i =0; i<forecastList.length; i++){    
          if(moment(forecastList[i].dt_txt).format("HH") == '09'){
            forecastList[i]['dayName'] = moment(forecastList[i].dt_txt).format("dddd");
            this.forecastListDetails.push(forecastList[i]);
            this.ForecastCalculation();
          }
        }
      }
    });
  }

  //Forecast Calculation for temperature and sea level
  ForecastCalculation(){
    for(let forecast of this.forecastListDetails){
      forecast['temperature'] = (forecast.main.temp - 273.15).toFixed(2);
      forecast['sea_level'] = forecast.main.sea_level;
    }
  }

}
