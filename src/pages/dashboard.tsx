import {Button} from "@/components/ui/button.tsx";
import {AlertTriangle, MapPin, RefreshCw} from "lucide-react";
import {useGeolocation} from "@/hooks/use-geolocation.ts";
import WeatherSkeleton from "@/components/loading-skeleton.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

const Dashboard = () => {

    const {coordinates, error: locationError, isLoading: locationLoading, getLocation} = useGeolocation();

    console.log("Geolocation", coordinates);

    const handleRefresh = () => {
        getLocation();
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
                <Button onClick={handleRefresh} variant={'outline'} size={'icon'}>
                    <RefreshCw className={'size-4'}/>
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
