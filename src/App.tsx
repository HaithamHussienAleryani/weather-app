
import './App.css'
import {BrowserRouter} from "react-router-dom";
import Layout from "@/components/layout.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";


function App() {


  return (
    <ThemeProvider defaultTheme={'dark'}>
     <BrowserRouter>
       <Layout>
           Helllp
       </Layout>
     </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
