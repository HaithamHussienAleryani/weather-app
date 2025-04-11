import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "@/components/layout.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Dashboard from "@/pages/dashboard.tsx";
import CityPage from "@/pages/city-pages.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


function App() {

    const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {staleTime: 5 * 10 * 1000, gcTime: 10 * 60 * 1000, retry: false, refetchOnWindowFocus: false},
            }
        }
    );

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider defaultTheme={'dark'}>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/cities/:cityName" element={<CityPage/>}/>
                        </Routes>
                    </Layout>
                </ThemeProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default App
