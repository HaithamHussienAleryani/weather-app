
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "@/components/layout.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Dashboard from "@/pages/dashboard.tsx";
import CityPage from "@/pages/city-pages.tsx";


function App() {


  return (
     <BrowserRouter>
        <ThemeProvider defaultTheme={'dark'}>
           <Layout>
               <Routes>
                   <Route path="/" element={<Dashboard/>} />
                   <Route path="/cities/:cityName" element={<CityPage/>} />
               </Routes>
           </Layout>
        </ThemeProvider>
     </BrowserRouter>
  )
}

export default App
