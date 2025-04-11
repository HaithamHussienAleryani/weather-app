import {Button} from "@/components/ui/button.tsx";
import {AlertTriangle, MapPin, RefreshCw} from "lucide-react";
import {useGeolocation} from "@/hooks/use-geolocation.ts";
import WeatherSkeleton from "@/components/loading-skeleton.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {useForecastQuery, useReverseGeocodeQuery, useWeatherQuery} from "@/hooks/use-weather.ts";
import {CurrentWeather} from "@/components/current-wather.tsx";
import {HourlyTemperature} from "@/components/hourly-temperature.tsx";
import {WeatherDetails} from "@/components/weather-details.tsx";
import {WeatherForecast} from "@/components/weather-forecast.tsx";

const Dashboard = () => {

    const {coordinates, error: locationError, isLoading: locationLoading, getLocation} = useGeolocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);


    const handleRefresh = () => {
        getLocation();
        if (!coordinates) {
            return;
        }
        weatherQuery.refetch();
        forecastQuery.refetch();
        locationQuery.refetch();
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button variant="outline" onClick={handleRefresh} className="w-fit">
                        <RefreshCw className="mr-2 h-4 w-4"/>
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton/>;
    }

    if (locationLoading) {
        return <WeatherSkeleton/>
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button variant="outline" onClick={getLocation} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4"/>
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }


    if (!coordinates) {
        return (
            <Alert>
                <MapPin className="h-4 w-4"/>
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather.</p>
                    <Button variant="outline" onClick={getLocation} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4"/>
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }


    return (
        <div className={'space-y-4'}>
            {/* favorite cities */}
            <div className={'flex justify-between items-center '}>
                <h1 className={'text-xl tracking-tight font-bold'}>My Location</h1>
                <Button onClick={handleRefresh} variant={'outline'} size={'icon'}
                        disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${
                            weatherQuery.isFetching ? "animate-spin" : ""
                        }`}
                    />
                </Button>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <CurrentWeather
                        data={weatherQuery.data}
                        locationName={locationName}
                    />
                    <HourlyTemperature data={forecastQuery.data}/>
                </div>

                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data}/>
                    <WeatherForecast data={forecastQuery.data}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
