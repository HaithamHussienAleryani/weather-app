import {API_CONFIG} from "@/api/config.ts";
import {Coordinates, ForecastData, GeocodingResponse, WeatherData} from "@/api/types.ts";

class WeatherAPI {
    private createUrl(endpoint:string,params:Record<string, string | number>){

        const searchParams = new URLSearchParams({
            appid:API_CONFIG.API_KEY,
                ...params,
        });

        return `${endpoint}?${searchParams.toString()}`
    }
    private async fetchWeather<T>(url:string) : Promise<T> {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json();
    }
    async getCurrentWeather({lat,lon}:Coordinates):Promise<WeatherData>{
        const url = this.createUrl(`${API_CONFIG.baseURL}/weather`,
            {lat:lat.toString(),lon:lon.toString(),units:API_CONFIG.DEFAULT_PARAMS.units});

    return  this.fetchWeather<WeatherData>(url);
    }
    async getForecast({lat,lon}:Coordinates):Promise<ForecastData>{
        const url = this.createUrl(`${API_CONFIG.baseURL}/forecast`,
            {lat:lat.toString(),lon:lon.toString(),units:API_CONFIG.DEFAULT_PARAMS.units});

        return  this.fetchWeather<ForecastData>(url);
    }

    async reverseGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`,
            {lat:lat.toString(),lon:lon.toString(),limit:1});

        return  this.fetchWeather<GeocodingResponse[]>(url);
    }

}


export const weatherApi = new WeatherAPI();