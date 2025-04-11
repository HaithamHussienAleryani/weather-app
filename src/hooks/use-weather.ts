import {Coordinates} from "@/api/types.ts";
import {useQuery} from "@tanstack/react-query";
import {weatherApi} from "@/api/weather.ts";


export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
    search: (search: string) => ["search", search] as const,
} as const

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? {lat: 0, lon: 0})
        , queryFn: () => coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
    });

}

export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat: 0, lon: 0})
        , queryFn: () => coordinates ? weatherApi.getForecast(coordinates) : null,
        enabled: !!coordinates,
    });

}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? {lat: 0, lon: 0})
        , queryFn: () => coordinates ? weatherApi.reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
    });
}


export function useLocationSearch(query: string) {
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn: () => weatherApi.searchLocations(query),
        enabled: query.length > 3,
    });
}