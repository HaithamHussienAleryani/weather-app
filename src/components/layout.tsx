import {PropsWithChildren} from "react";

const Layout = ({children}: PropsWithChildren) => {
    return (
        <div className={'bg-gradient-to-br from-background to-muted'}>
            header
            <main className={'min-h-screen container mx-auto px-4 py-8'  }>

                {children}
            </main>
            <footer className={'backdrop-blur border-t py-12'}>
                <div  className={'container mx-auto px-4 text-center text-gray-400 '}>
                    <p>Made by Haitham for more visit <a href="https://haith.dev">haith.dev</a> </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
