import {Coordinates} from "@/api/types";
import {useEffect, useState} from "react";


type GeolocationState = {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;


}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = async () => {
        setLocationData((prev) => ({...prev, isLoading: true, error: null}));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geo location is not supported by the browser",
                isLoading: false,
            });
            return;
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocationData({
                    coordinates: {lat: position.coords.latitude, lon: position.coords.longitude},
                    isLoading: false,
                    error: null
                });
            }, (error) => {
                let errorMessage: string;

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage =
                            "Location permission denied. Please enable location access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                }

                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            });
        }
    }
    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation,
    }
}