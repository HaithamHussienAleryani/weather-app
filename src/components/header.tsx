import {Link} from "react-router-dom";

import {ThemeToggle} from "@/components/theme-toggle.tsx";
import {useTheme} from "@/components/theme-provider.tsx";
import {CitySearch} from "@/components/city-search.tsx";


export function Header() {
    const {theme} = useTheme();

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to={"/"}>
                    <img
                        src={theme === "dark" ? "/logo.png" : "/logo2.png"}
                        alt="Klimate logo"
                        className="h-14"
                    />
                </Link>

                <div className="flex gap-4">
                    <CitySearch/>
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    );
}