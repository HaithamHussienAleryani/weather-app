import {Link} from "react-router-dom";
import {useTheme} from "@/components/theme-provider.tsx";
import {Moon, Sun} from "lucide-react";

const Header = () => {
    const {theme ,setTheme} = useTheme();
     const isDark = theme == 'dark';
    return (
        <div className={'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'}>
            <div className={'container mx-auto flex h-16 items-center justify-between px-4'}>
                <Link to={'/'}><img src={ isDark? '/logo.png':'/logo2.png'}  alt={"Weather app logo"} className={'h-14'}/></Link>
                <div onClick={()=>setTheme(isDark?'light':'dark')} className={`flex items-center cursor-pointer transition-transform duration-500 
                ${isDark?'rotate-180':'rotate-0'}
                `}>
                    {isDark ?<Sun className={'size-6 text-yellow-300 rotate-0 transition-all'}/>:<Moon className={'size-6 text-blue-300 rotate-0 transition-all'}/>}
                </div>
            </div>
        </div>
    );
};

export default Header;
