import {useParams, useSearchParams} from "react-router-dom";
import {useForecastQuery, useWeatherQuery} from "@/hooks/use-weather.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertTriangle} from "lucide-react";

import WeatherSkeleton from "@/components/loading-skeleton.tsx";
import {CurrentWeather} from "@/components/current-wather.tsx";
import {HourlyTemperature} from "@/components/hourly-temperature.tsx";
import {WeatherDetails} from "@/components/weather-details.tsx";
import {WeatherForecast} from "@/components/weather-forecast.tsx";
import {FavoriteButton} from "@/components/favorite-button.tsx";


const CityPage = () => {

    const [searchParams] = useSearchParams();
    const params = useParams();

    const lat = parseFloat(searchParams.get('lat') || "0");
    const lon = parseFloat(searchParams.get('lon') || "0");

    const coordinate = {lat, lon};

    const weatherQuery = useWeatherQuery(coordinate);
    const forecastQuery = useForecastQuery(coordinate);


    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again later.</p>

                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <WeatherSkeleton/>;
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    {params.cityName}, {weatherQuery.data.sys.country}
                </h1>
                <div className="flex gap-2">
                    <FavoriteButton
                        data={{...weatherQuery.data, name: params.cityName}}
                    />
                </div>
            </div>

            <div className="grid gap-6">
                <CurrentWeather data={weatherQuery.data}/>
                <HourlyTemperature data={forecastQuery.data}/>
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data}/>
                    <WeatherForecast data={forecastQuery.data}/>
                </div>
            </div>
        </div>
    );
};

export default CityPage;
